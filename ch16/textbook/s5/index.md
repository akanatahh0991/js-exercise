## 16.5 ストリーム
下記実装のようにストリームを使わない実装の問題点
- ファイル内容全体を保持するためのメモリが必要
- ファイルの読み込みが完了してからでないと、書き込みが実行されない
```javascript
const fs = require("fs");

// 非同期だがストリームではない（つまり非効率な）関数。
function copyFile(sourceFilename, destinationFilename, callback) {
    fs.readFile(sourceFilename, (err, buffer) => {
        if (err) {
            callback(err);
        } else {
            fs.writeFile(destinationFilename, buffer, callback);
        }
    });
}
```

ストリームの考え方 - 小さなデータチャンクを処理するようにして、データセット全体が一度にメモリに保持されないようにする。
Nodeでサポートされている4種類のストリーム
- Readable - データソース（データの入力元）。`fs.crateReadStream()`や`process.stdin`など。
- Writable - データシンク（データの出力先）。データをチャンク単位で書き込み、全てのデータを指定したファイルを書き込むことができる。
- Duplex - ReadableストリームとWritableストリームを１つのオブジェクトにまとめたもの。`net.connect`など。
- Transform - Duplexストリームとの違いは、Transformストリームに書き込まれた内容は何らかの変換後に同じストリームから読み出すことができる点。
  
デフォルトではストリームはバッファ（バイト配列）を読み書きする。Readableストリームの`setEncoding`を呼び出すとBufferではなくデコードされた文字列が返される。

ストリームAPIの難しい点 - ストリームには読み出しと書き込みの２つの端があるが、そのデータの流れる速度が異なる点。イベントを介して、ストリームの読み取り可能性と書き込み可能性を調整する必要がある。

### 16.5.1 パイプ
あるストリームからデータを読み込んだ後、別のストリームにそのデータを書き込む場合に使用する。
Readableストリームの`pipe`にWritableストリームを引数指定するだけ。
```javascript
const fs = require("fs");

function pipeFileToSocket(filename, socket) {
    fs.createReadStream(filename).pipe(socket);
}
```
次のUtilクラスはあるストリームを別のストリームにパイプしてエラー時の処理をおこなう。
```javascript
function pipe(readable, writable, callback) {
    // まず、エラー処理を設定する。
    function handleError(err) {
        readable.close();
        writable.close();
        callback(err);
    }

    // 次に、パイプを定義し、通常の終了処理を行う。
    readable
        .on("error", handleError)
        .pipe(writable)
        .on("error", handleError)
        .on("finish", callback);
}
```
Transformストリームでファイルを圧縮する関数の例
```javascript
const fs = require("fs");
const zlib = require("zlib");

function gzip(filename, callback) {
    // ストリームを作成する。
    let source = fs.createReadStream(filename);
    let destination = fs.createWriteStream(filename + ".gz");
    let gzipper = zlib.createGzip();

    // パイプラインを設定する。
    source
        .on("error", callback)      // 読み込みエラー時にコールバックを呼び出す。
        .pipe(gzipper)
        .pipe(destination)
        .on("error", callback)      // 書き込みエラー時にコールバックを呼び出す。
        .on("finish", callback);    // 書き込みが完了したときにコールバックを呼び出す。
}
```

### 16.5.2 非同期の反復
Node12以降では、Readableストリームは非同期イテレータになっている。

### 16.5.3 ストリームへの書き込みとバックプレッシャーへの対応
Writableストリームのwriteを使って書き込みを行う場合
- Bufferを使用 - バッファのバイト列が書き込まれる
- 文字列を使用 - 文字列をエンコードしながらバイト列で書き込み（第二引数で指定したencodingまたはデフォルトエンコードが使われる）
`write`は内部バッファがいっぱいになっていない場合はtrue, そうでない場合にfalseを返す。
内部バッファが一杯の場合は、バックプレッシャーと呼ばれる。（処理可能な速度を超えて書き込んでいる。）
`drain`イベントを発生させてバッファがアックマでwriteを呼び出すのをやめるのが吉。こういった処理を内部でしてくれるので通常は`pipe`を使う。
```javascript
function write(stream, chunk) {
    const hasMoreRoom = stream.write(chunk);

    if (hasMoreRoom) {
        return Promise.resolve(null);
    } else {
        return new Promise(resolve => {
            stream.once("drain", resolve);
        })
    }
}

/**
 * source.pipe(destination)と同じ内容を実装したもの
 * @param {ReadableStream} source 
 * @param {WritableStream} destination 
 */
async function copy(source, destination) {
    destination.on("error", () => process.exit());

    for await (const chunk of source) {
        await write(destination, chunk);
    }
}
```
### 16.5.4 イベントによるストリームの呼び出し
NodeのReadableストリームには２つのモードがある。
### フローイングモード(Flowing mode)
読み取り可能なデータが届くと`data`イベント形式で通知される。`data`イベントハンドラを登録することでフローイングモードに切り替わる。
ストリームの終端にたどり着くと`end`イベントが通知される。

```javascript
const fs = require("fs");

// 「フローイングモード」のストリームAPIによるファイルコピー関数。
// 指定されたコピー元ファイルの内容を、指定されたコピー先ファイルにコピーする。
// 成功した場合は、nullを引数にしてコールバックを呼び出す。エラーの場合は、
// Errorオブジェクトを引数にしてコールバックを呼び出す。
function copyFile(sourceFilename, destinationFilename, callback) {
    let input = fs.createReadStream(sourceFilename);
    let output = fs.createWriteStream(destinationFilename);

    input.on("data", (chunk) => {           // 新しいデータが得られたときに、
        let hasRoom = output.write(chunk);  // そのデータをoutputストリームに書き込む。
        if (!hasRoom) {                     // outputストリームが一杯の場合は、
            input.pause();                  // inputストリームを一時停止する。
        }
    });
    input.on("end", () => {                 // inputの最後まで到達したら、
        output.end();                       // outputストリームを終了させる。
    });
    input.on("error", err => {              // inputでエラーが発生した場合、
        callback(err);                      // エラーを引数にコールバックを呼び出し、
        process.exit();                     // 終了する。
    });

    output.on("drain", () => {              // outputが一杯ではなくなったときに、
        input.resume();                     // inputのdataイベントを再開する。
    });
    output.on("error", err => {             // outputでエラーが発生した場合、
        callback(err);                      // エラーを引数にコールバックを呼び出し、
        process.exit();                     // 終了する。
    });
    output.on("finish", () => {             // outputが完全に書き込まれたときに、
        callback(null);                     // エラーなしでコールバックを呼び出す。
    });
}

// ファイルをコピーするための簡単なコマンドラインユーティリティ。
let from = process.argv[2], to = process.argv[3];
console.log(`Copying file ${from} to ${to}...`);
copyFile(from, to, err => {
    if (err) {
        console.error(err);
    } else {
        console.log("done.");
    }
});
```
#### ポーズモード
ReadableStreamの初期のモード。`read`を明示的に呼び出してデータを取り出す。
ストリームでデータが読み出せるようになると`readable`イベントが通知される。このイベントを受け取ったら`read`する必要がある。
```javascript
const crypto = require("crypto");

// 指定されたファイルの内容のSHA256ハッシュを計算し、そのハッシュを
// （文字列として）指定されたエラーファーストコールバック関数に渡す。
function sha256(filename, callback) {
    let input = fs.createReadStream(filename);  // データストリーム。
    let hasher = crypto.createHash("sha256");   // ハッシュ計算用。

    input.on("readable", () => {            // 読み出せるデータがあるとき、
        let chunk;
        while(chunk = input.read()) {       // チャンクを読み出し、nullでなければ、
            hasher.update(chunk);           // チャンクをhasherに渡し、
        }                                   // 読み出せなくなるまでループする。
    });
    input.on("end", () => {                 // ストリームの最後で、
        let hash = hasher.digest("hex");    // ハッシュを計算し、
        callback(null, hash);               // コールバックに渡す。
    });
    input.on("error", callback);            // エラー発生時は、コールバックを呼び出す。
}

// ファイルのハッシュを計算する簡単なコマンドラインユーティリティ。
sha256(process.argv[2], (err, hash) => {    // コマンドラインでファイル名を指定する。
    if (err) {                              // エラーが発生した場合、
        console.error(err.toString());      // エラーを出力する。
    } else {                                // エラーが発生しなかった場合、
        console.log(hash);                  // ハッシュ文字列を出力する。
    }
});
```