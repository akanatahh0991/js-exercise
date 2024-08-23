## 15.11 ネットワーク処理
Webブラウザはユーザーアクションに応じてネットワークにリクエストを送信するだけではなく、JavaScript APIとしてもネットワークを使えるようにしている。
主に３種類のネットワークAPIがある。
- fetchメソッド - HTTPおよびHTTPSリクエストを送信するためのPromiseベースのAPIを定義している。
- Server-Sent Events(SSE) API - ロードポーリング（Webサーバとのネットワーク接続を聞き続けて、サーバーから必要なときいにデータをいつでも送信できるようにする技術）のためのイベントベースの便利なインターフェース。
- WebSocket - HTTPとともに使うことを目的としたネットワークプロトコル。非同期のメッセージパッシングAPIを定義している。クライアントとサーバーが相互にメッセージを送受信できるようにする。
### 15.11.1 fetch()
```javascript
fetch("/api/users/current")             // HTTP（またはHTTPS）のGETリクエストを送信する。
    .then(response => response.json())  // ボディをJSONオブジェクトとして解釈する。
    .then(currentUser => {              // そして、解釈されたオブジェクトを処理する。
        displayUserInfo(currentUser);
    });
```
```javascript
async function isServiceReady() {
    let response = await fetch("/api/service/status");
    let body = await response.text();
    return body === "ready";
}
```
#### HTTPステータスコード、レスポンスヘッダ、ネットワークエラー
サーバのレスポンスが届き始めた時点でPromiseが解決し、HTTPステータスコードとレスポンスヘッダが得られる。fetchがPromiseを失敗させるのはWebサーバーにアクセスできない場合のみ（404や500であってもPromiseは成功する。）
```javascript
fetch("/api/users/current")   // HTTP（HTTPS）のGETリクエストを送信する。
    .then(response => {       // レスポンスを取得したときに、まず、
        if (response.ok &&    // 成功しているか、想定している種類のデータかを確認する。
            response.headers.get("Content-Type") === "application/json") {
            return response.json(); // ボディ部に対するPromiseを返す。
        } else {
            throw new Error(        // 異なる場合はエラーをスローする。
                `Unexpected response status ${response.status} or content type`
            );
        }
    })
    .then(currentUser => {    // response.json()のPromiseが解決したとき、
        displayUserInfo(currentUser); // ボディ部を解釈して何か処理をする。
    })
    .catch(error => {         // 何か問題が起きた場合は、エラーをログに記録するだけ。
        // ユーザのブラウザがオフラインの場合は、fetch()呼び出し自身が失敗する。
        // サーバが不正なレスポンスを返した場合は、上記のコードでエラーがスローされる。
        console.log("Error while fetching current user:", error);
    });
```
- HTTPステータスコード - 200から209の場合、`Response`オブジェクトの`ok`は`true`になる。
- HTTPヘッダー - `Response`オブジェクトの`has`でヘッダの有無、`get`でヘッダの値の取得ができる。HTTPのヘッダ名は大文字と小文字を区別しない。また、反復可能である。
  ```javascript
  fetch(url).then(response => {
    for(let [name,value] of response.headers) {
        console.log(`${name}: ${value}`);
    }
    });
  ```
#### リクエストパラメータの設定
`URL`オブジェクトの`searchParams`を使う。
```javascript
async function search(term) {
    let url = new URL("/api/search");
    url.searchParams.set("q", term);
    let response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    let resultsArray = await response.json();
    return resultsArray;
}
```
#### リクエストヘッダの設定
```javascript
let authHeaders = new Headers();
// HTTPS接続ではない場合、Basic認証は使わない。
authHeaders.set("Authorization",
                `Basic ${btoa(`${username}:${password}`)}`);
fetch("/api/users/", { headers: authHeaders })
    .then(response => response.json())            // エラー処理は割愛。
    .then(usersList => displayAllUsers(usersList));
```
`Request`オブジェクトを生成して`fetch`に渡す方法もある。
```javascript
let request = new Request(url, { headers });
fetch(request).then(response => ...);
```
#### レスポンスボディの解釈
- json() - 本体テキストをJSONとして解釈した結果を返す
- text() - 本体テキストをUTF-8でデコードした文字列で返す
- arrayBuffer() - ArrayBufferで解決するPromiseを返す。バイナリデータが含まれる場合に便利。
- blob() - Blob(Binary Large Object)オブジェクトで解決されるPromiseを返す。大量のバイナリデータを扱う場合に便利。Blobとしてレスポンスボディを要求した場合、ブラウザはレスポンスデータを一時ファイルに流し込み、この一時ファイルを表すBlobオブジェクトを返す。`URL.createObjectURL()`でBlobを参照するURLを作成できる。
- formData() - FormDataオブジェクトで解決されるPromiseを返す。レスポンスボディがmultipart/form-data形式でエンコードされる場合はこのメソッドを使用すること。サーバへのPOSTリクエストでは一般的だが、サーバからのレスポンスでは一般的ではないため、あまり利用頻度は高くない。
  
#### レスポンスボディのストリーム処理
レスポンスボディ全体を何らかの形で返す上記メソッド以外にも、ストリーム処理する方法もある。
- Responseオブジェクトのbodyプロパティは`ReadableStream`。
- textやjsonなどのボディ読み込みメソッドが呼ばれると、bodyUsedがtrueとなり、bodyストリーム読み出し済となる。
- `response.body.getReader()`でストリーム読み出しオブジェクトを取得できる。`read`メソッドを使えば、ストリームからチャンクを非同期で読み出すことができる。
- `read`はPromseを返し、doneとvalueというプロパティを持つオブジェクトで解決される。
- doneはボディが読み出されるまたはストリームが閉じられるとtrueとなる。
- valueは次のチャンクがUint8Arrayとして格納される。次のチャンクがない場合はundefinedとなる。
```javascript
fetch('big.json')
    .then(response => streamBody(response, updateProgress))
    .then(bodyText => JSON.parse(bodyText))
    .then(handleBigJSONObject);
```
```javascript
/**
 * fetch()リクエストから取得したResponseオブジェクトのボディをストリーム
 * 処理するための非同期関数。最初の引数としてResponseオブジェクトを渡す。
 * その後の2つの引数にはコールバックを渡す。このコールバックは省略可能。
 *
 * 2番目の引数として関数を指定した場合、このreportProgressコールバックは、
 * チャンクを受信するたびに1度ずつ呼び出される。コールバック呼び出しのときの
 * 最初の引数は、これまで受信した総バイト数。2番目の引数には、ダウンロードの
 * 完了度を示す0～1の値が渡される。ただし、Responseオブジェクトが
 * 「Content-Length」ヘッダを持たない場合は、常にNaNとなる。
 *
 * データが届いたときに処理を行いたい場合は、3番目の引数として関数を指定する。
 * このprocessChunkコールバックに、データのチャンクがUint8Arrayオブジェクト
 * として渡される。
 *
 * streamBody()は文字列で解決されるPromiseを返す。processChunkコールバックが
 * 指定されていた場合、この文字列はコールバックから返された値を連結したものに
 * なる。processChunkコールバックが指定されていない場合は、データをUTF-8
 * 文字列に変換し連結したものになる。
 */
async function streamBody(response, reportProgress, processChunk) {
    // 全部で何バイト受信することになるのか。ヘッダがない場合はNaN。
    let expectedBytes = parseInt(response.headers.get("Content-Length"));
    let bytesRead = 0;                       // これまで受信したバイト数。
    let reader = response.body.getReader();  // この関数を使ってバイトデータを読み出す。
    let decoder = new TextDecoder("utf-8");  // バイトデータをテキストに変換する。
    let body = "";                           // これまで読み出したテキスト。

    while(true) {                                 // 下に抜けるまでループ。
        let {done, value} = await reader.read();  // チャンクを読み出す。

        if (value) {                              // バイト配列が得られたら、
            if (processChunk) {                   // コールバックが指定されている場合。
                let processed = processChunk(value);  // バイトデータを処理する。
                if (processed) {
                    body += processed;
                }
            } else {                              // 指定されていない場合、バイトデータを
                body += decoder.decode(value, {stream: true}); // テキストにする。
            }

            if (reportProgress) {                 // 進捗報告用のコールバックが指定
                bytesRead += value.length;        // されていれば、呼び出す。
                reportProgress(bytesRead, bytesRead / expectedBytes);
            }
        }
        if (done) {                               // これが最後のチャンクなら、
            break;                                // ループを抜ける。
        }
    }

    return body;   // 結合したボディテキストを返す。
}
```
#### リクエストメソッドとリクエストボディの設定
GET以外のメソッド(POST, PUT, DELETEなど)を使う場合は、`method`パラメータをもつオプションオブジェクトを渡す。
```javascript
fetch(url, { method: "POST" }).then(r => r.json()).then(handleResponse);
```
POSTやPUTリクエストの場合は、サーバに送信するためのデータをリクエストボディに含めるのが一般的。オプションオブジェクトの`body`プロパティに設定する。
```javascript
fetch(url, {
    method: "POST",
    body: "hello world"
})
```
リクエストボディを指定すると`Content-Length`は自動で設定される。ボディが文字列の場合、`Content-Type`は`text/plain;charaset=UTF-8`となるため、`text/html`や`application/json`などを設定する場合は下記のようにオーバーライドすること。
```javascript
fetch(url, {
    method: "POST",
    headers: new Headers({"Content-Type": "application/json"}),
    body: JSON.stringify(requestBody)
})
```
POSTリクエストではURLのクエリ部にパラメータをエンコードするのではなく、リクエストボディに名前と値のパラメータのセットを含める。
このような処理では以下の２つの方法がある。
- `URLSearchParams`をbodyプロパティの値として渡す。Content-Typeには自動的に`application/x-wwwform-urlencoded;charset=UTF-8`が設定される。
- `FormData`を使って指定する。Content-Typeには自動的に`multipart/form-data;boundary=...`が設定される。...の部分にはボディに使われているものと同じ一意な文字列が使用されている。アップロードしたい値が長い場合、FileオブジェクトやBlobオブジェクトで独自のContent-Typeを持つ場合に便利。

#### fetchによるファイルアップロード
リクエストボディにFormDataを使用すれば実現できる。FileオブジェクトはBlobの一種である。
```javascript
// canvas.toBlob()関数はコールバックベース。
// この関数はPromiseベースのラッパー。
async function getCanvasBlob(canvas) {
    return new Promise((resolve, reject) => {
        canvas.toBlob(resolve);
    });
}

// キャンバスからPNGファイルをアップロードする方法。
async function uploadCanvasImage(canvas) {
    let pngblob = await getCanvasBlob(canvas);
    let formdata = new FormData();
    formdata.set("canvasimage", pngblob);
    let response = await fetch("/upload", { method: "POST", body: formdata });
    let body = await response.json();
}
```
#### クロスオリジンリクエスト
クロスオリジンでリクエストする場合、ブラウザはOriginヘッダを追加して異なるオリジンのドキュメントから送信されていることをWebサーバに通知する。Originヘッダはheadersプロパティで上書きできない。サーバが適切な`Access-Control-Allow-Origin`ヘッダでリクエストに応答した場合、リクエストは処理される。サーバーが明示的に許可していない場合は`fetch`は失敗する。
#### リクエストの中止
ユーザーがキャンセルボタンを押下した場合やリクエストに時間がかかり過ぎる場合など、`fetch`リクエストをキャンセルしたい場合は`AbortController`と`AbortSignal`を使用する。
```javascript
// この関数はfetch()と似ているが、オプションオブジェクトにtimeout
// プロパティを追加している。このプロパティで指定したミリ秒以内に
// リクエストが完了しない場合は中止する。
function fetchWithTimeout(url, options={}) {
    if (options.timeout) {  // timeoutが存在し、値がゼロではない場合、
        let controller = new AbortController();   // コントローラを作成する。
        options.signal = controller.signal;       // signalプロパティを設定する。
        // 指定したミリ秒が経過した後に中止シグナルを送信するタイマーを
        // 開始する。なお、このタイマーをキャンセルすることはない。fetchが
        // 完了した後にabort()を呼び出しても問題はない。
        setTimeout(() => { controller.abort(); }, options.timeout);
    }
    // ここでは通常のfetchを行うだけ。
    return fetch(url, options);
}
```
#### そのほかのリクエストオプション
- cache - ブラウザのデフォルトのキャッシュ動作をオーバーライドする。
  - default, no-store, reload, no-cache, force-cacheなどがある
- redirect - ブラウザがサーバからのリダイレクトレスポンスの制御方法を指定できる。
  - follow - デフォルト。ブラウザが自動的にリダイレクトに従うようになる。このデフォルト値を使用する場合、ステータスコードは300から399にはならない。
  - error - fetchから返されるResponseを失敗させる
  - manual - fetchから返されるPromiseは300から399の範囲の値のstatusをもつResponseオブジェクトで解決される場合がある。この場合、Locationヘッダを使って、手動でリダイレクトを追跡する必要がある。
- referer - 相対URLを含む文字列を設定する。この値はHTTPのRefererヘッダの値となる。

### 15.11.2 Server-Sentイベント
イベントが発生したときにサーバからイベントを送信できると便利な場合がある。クライアントがサーバーにリクエストを行い、その後クライアントもサーバも接続を閉じない手法が考え出された。ネットワーク接続はずっと開いたままにはできないが、クライアント側で接続が終了したことを検知した場合は再接続する。
`EventSource API`としてサポートされている。
- `EventSource`コンストラクタにURLを指定する。
- メッセージイベントのeventオブジェクトにはdataプロパティ：ペイロードしてサーバーが送信した文字列とtypeプロパティ：サーバが決定したイベント名が格納される。
```javascript
let ticker = new EventSource("stockprices.php");
ticker.addEventListener("bid", (event) => {
    displayNewBid(event.data);
});
```
オンラインチャットのようなマルチユーザのアプリケーションなどでよく使用される。

クライアント側の実装
```html
<html>
<head><title>SSE Chat</title></head>
<body>
<!-- チャットのUIはテキスト入力フィールドだけ。 -->
<!-- チャットのメッセージはこの入力フィールドの前に挿入される。 -->
<input id="input" style="width:100%; padding:10px; border:solid black 2px"/>
<script>
// UIの細部を設定する。
let nick = prompt("Enter your nickname");     // ユーザのニックネームを取得する。
let input = document.getElementById("input"); // 入力フィールドを探す。
input.focus();                                // キーボードフォーカスを設定する。

// EventSourceを使って新着メッセージの通知を受け取るようにする。
let chat = new EventSource("/chat");
chat.addEventListener("chat", event => {  // チャットメッセージが届いたら
    let div = document.createElement("div");  // <div>を作成する。
    div.append(event.data);                   // メッセージからテキストを追加する。
    input.before(div);                        // inputの前にdivを追加する。
    input.scrollIntoView();                   // スクロールしてinput要素を表示する。
});

// fetchを使ってサーバにユーザのメッセージを送信する。
input.addEventListener("change", ()=>{  // ユーザがリターンキーを押下したら
    fetch("/chat", {                    // このURLに対してHTTPリクエストを送信する。
        method: "POST",                 // ボディを持つPOSTリクエストにする。
        body: nick + ": " + input.value // ユーザのニックネームと入力を設定する。
    })
    .catch(e => console.error);         // レスポンスは無視。ただしエラーはログする。
    input.value = "";                   // inputを空にする。
});
</script>
</body>
</html>
```

サーバー側の実装
```javascript
// これはサーバサイドJavaScript。Nodeで実行する。
// 単純で完全に匿名のチャットルーム。
// 新しいメッセージを/chatにPOSTする。同じURLからtext/event-streamの
// メッセージを取得する。/へのGETリクエストは、クライアントサイドの
// チャットURIが含まれた単純なHTMLファイルを返す。
const http = require("http");
const fs = require("fs");
const url = require("url");

// チャットクライアント用のHTMLファイル。以下で使う。
const clientHTML = fs.readFileSync("chatClient.html");

// イベントを送信するServerResponseオブジェクトの配列。
let clients = [];

// 新しいサーバを作成し、ポート8080でリッスンする。
// 使用するには、http://localhost:8080/に接続する。
let server = new http.Server();
server.listen(8080);

// サーバが新しいリクエストを受け取ると、この関数が実行される。
server.on("request", (request, response) => {
    // リクエストされたURLを解釈する。
    let pathname = url.parse(request.url).pathname;

    // 「/」に対するリクエストの場合は、クライアントサイドのチャットUIを送信する。
    if (pathname === "/") {  // チャットUIに対するリクエスト。
        response.writeHead(200, {"Content-Type": "text/html"}).end(clientHTML);
    }
    // 「/chat」以外へのパスへのリクエストや「GET」や「POST」以外の
    // メソッドの場合は404エラーを送信する。
    else if (pathname !== "/chat" ||
             (request.method !== "GET" && request.method !== "POST")) {
        response.writeHead(404).end();
    }
    // /chatリクエストがGETの場合は、クライアントが接続しようとしている。
    else if (request.method === "GET") {
        acceptNewClient(request, response);
    }
    // それ以外の/chatリクエストは新しいメッセージのPOST。
    else {
        broadcastNewMessage(request, response);
    }
});

// /chatエンドポイントへのGETのリクエストを処理する。このリクエストは、
// クライアントが新しいEventSourceオブジェクトを生成したとき（または
// EventSourceが自動的に再接続されたとき）に送信される。
function acceptNewClient(request, response) {
    // レスポンスオブジェクトを記憶して、今後メッセージを送れるようにする。
    clients.push(response);

    // クライアントが接続を終了した場合は、対応するレスポンスオブジェクトを
    // アクティブなクライアントの配列から削除する。
    request.connection.on("end", () => {
        clients.splice(clients.indexOf(response), 1);
        response.end();
    });

    // ヘッダを設定し、このクライアントだけに最初のチャットイベントを送信する。
    response.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Connection": "keep-alive",
        "Cache-Control": "no-cache"
    });
    response.write("event: chat\ndata: Connected\n\n");

    // なお、ここでは意図的にresponse.end()を呼び出してはいない。
    // 接続を維持することで、Server-Sent Eventsが機能するようにしている。
}

// この関数は、ユーザが新しいメッセージを入力したときに、/chatエンド
// ポイントへのPOSTリクエストに対して呼び出される。
async function broadcastNewMessage(request, response) {
    // まず、ユーザのメッセージを取得するためにリクエストのボディを読み出す。
    request.setEncoding("utf8");
    let body = "";
    for await (let chunk of request) {
        body += chunk;
    }

    // ボディを読み込んだら、空のレスポンスを送信し、接続を閉じる。
    response.writeHead(200).end();

    // メッセージをtext/event-stream形式で作成し、各行の先頭に
    // 「data: 」を付与する。
    let message = "data: " + body.replace("\n", "\ndata: ");

    // メッセージデータに「chat」イベントであることを示す接頭辞と、
    // イベントの終了を示すために改行を2度付与する。
    let event = `event: chat\n${message}\n\n`;

    // 待ち受け中のすべてのクライアントにこのイベントを送信する。
    clients.forEach(client => client.write(event));
}
```
### 15.11.3 WebSocket
WebSocketを使用すると、ブラウザ内のJavaScriptのコードでテキストやバイナリのメッセージを双方向で交換できる。
SSEとは異なり、バイナリメッセージがサポートされている。WebSocketを実現するネットワークプロトコルはHTTP拡張の一種。WebSocketのURLは`wss://`で始まる。（一般的に、ブラウザは安全な`https://` の接続で読み込まれたページでしかWebSocketの使用を認めていない。）
WebSocket接続を確立するには、ブラウザがサーバとのHTTP接続を確立し、サーバにUpgrade: websocketヘッダーを送信する必要がある。WebサーバもWebSocketに対応している必要がある点に注意。

#### WebSocketの作成、接続、切断
WebSocketを作成すると、自動的に接続処理が始まる。接続の状態は`readyState`を調べるとわかる。
```javascript
let socket = new WebSocket("wss://example.com/stockticker");
```
WebSocketがOPEN状態になった場合など接続状態の変更に合わせて処理を行う場合は、onopenなどのプロパティあるいはaddEventListenerを使用する。
```javascript
// WebSocket 接続を作成
const socket = new WebSocket("ws://localhost:8080");

// 接続が開いたときのイベント
socket.addEventListener("open", (event) => {
  socket.send("Hello Server!");
});

// メッセージの待ち受け
socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
});
```
#### WebSocketでメッセージを送信する
`WebSocket`の`send`を呼び出す。引数には文字列、Blob、ArrayBuffer、型付き引数、DataViewオブジェクトが指定できる。

#### WebSocketからメッセージを受信する
`WebSocket`の`onmessage`か`addEventListener`で`message`イベントを受信する。`message`には`data`プロパティがあり、サーバのメッセージが格納される。