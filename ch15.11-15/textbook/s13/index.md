## 15.13 ワーカースレッドとメッセージング
JavaScriptはシングルスレッド。長時間処理は継続しないのが原則。
スレッドを立てる場合は、`Worker`インスタンスを使用する。
- `Worker` - ワーカを作ったスレッドからワーカーを参照するためのオブジェクト。
- `WorkerGlobalScope` - 新しいワーカーに対するグローバルオブジェクト。
- メインスレッドとの通信 - 非同期のメッセージングパッシング

### 15.13.1 Workerオブジェクト
- Workerオブジェクトの生成 - 相対パスまたは同じオリジンの絶対パスのスクリプトを指定する。
```javascript
let dataCruncher = new Worker("utils/cruncher.js");
```
- `postMessage`によるWorkerへのデータの送信 - データは構造化複製アルゴリズムにより複製される。
```javascript
dataCruncher.postMessage("/api/data/to/crunch");
```
- `onmessage` / `addEventListener`によるWorkerからのイベント受信
```javascript
dataCruncher.onmessage = function(e) {
    let stats = e.data;   // メッセージは、イベントのdataプロパティに格納されている。
    console.log(`Average: ${stats.mean}`);
}
```
- `terminate` - ワーカースレッドを強制的に停止させる。

### 15.13.2 ワーカーのグローバルオブジェクト
ワーカースレッドはDOMが動作している環境とは別の新しいJavaScript実行環境で実行される。新しい実行環境でのグローバルオブジェクトが`WorkerGlobalScope`。
- `postMessage` - ワーカーの外側に対して`message`イベントを発生させる
- `onmessage` - ワーカーの外側からのデータを受信する
- `close` - ワーカーを終了させる。(Workerのterminateと同じ)

### 15.13.3 ワーカーへのコードの読み込み
ワーカー中で使用する追加コードを含めるための方法
```javascript
// 処理を開始する前に、必要なクラスやユーティリティをロードする。
importScripts("utils/Histogram.js", "utils/BitSet.js");
```
### 15.13.4 ワーカーの実行モデル
登録されたコールバックが呼び出されたらスレッドは自動的に終了する。`Worker`からスレッドの終了を確認するメソッドは用意されていない。

#### ワーカーのエラー
ワーカーで例外が発生して、catchされない場合、`WokerGlobalScope`に対して`error`イベントが発生する。イベントが処理され、`preventDefault`が呼び出されるとエラー伝搬が終了する。そうでない場合は、`error`イベントが`Worker`で発生する。
Promiseの失敗を受信するには`self.onunhandledrejection`を定義する。

### 15.13.5 `postMessage`, `MessagePort`, `MessageChannel`
`Worker`
- クライアント側、ワーカー側の`postMessage`は一対の`MessagePort`を呼び出すことで動作する。
- `MessageChannel`コンストラクタを使って`MessagePort`を生成できる。
```javascript
let channel = new MessageChannel;                 // 新しいチャンネルを作成する。
let myPort = channel.port1;                       // このチャンネルはお互いに
let yourPort = channel.port2;                     // 接続されたポートを2つ持つ。

myPort.postMessage("Can you hear me?");           // 一方のポートにメッセージを送ると
yourPort.onmessage = (e) => console.log(e.data);  // もう一方のポートに届く。
```
- `MessagePort`を`postMessage`で渡すことで、デフォルトで生成される`MessagePort`の他にポートを追加できる。
```javascript
let worker = new Worker("worker.js");
let urgentChannel = new MessageChannel();
let urgentPort = urgentChannel.port1;
// postMessageにportを含むオブジェクトを指定する場合は、第二引数にもportを指定する必要がある。
// portを渡すと、そのportをpostした側では使えなくなる。
worker.postMessage({ command: "setUrgentPort", value: urgentChannel.port2 },
                    [ urgentChannel.port2 ]);
// これで、次のようにworkerからの緊急メッセージを受け取ることができる。
urgentPort.addEventListener("message", handleUrgentMessage);
urgentPort.start();   // メッセージの受信を開始する。addEventListenerを使用する場合はこれを呼ばないとメッセージが通知されずにキューに残る。
// また、次のように緊急メッセージを送信する。
urgentPort.postMessage("test");
```

### 15.13.6 postMessageによるクロスオリジンメッセージング
ドキュメント中に`<iframe>`要素が含まれる場合、その要素は独立したウィンドウとして動作する。
ドキュメントと`<iframe>`が別のオリジンである場合、一方のJavaScriptが他方のウィンドウのコンテンツにアクセスできない。
Windowの`postMessage`を使うことでオリジンが異なっていてもメッセージによりやりとりができる。
- 第一引数 - データ（任意のメッセージ）
- 第二引数 - メッセージを受信する相手を指定するオリジン（プロトコル、ホスト名、ポート）
- 第三引数 - コピーではなく転送したいオブジェクトを転送する場合に指定する
[実装例](https://www.konosumi.net/entry/2022/10/30/233552)


