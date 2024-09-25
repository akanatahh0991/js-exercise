## 16.7 ファイルの操作
- fsモジュール - ファイルとディレクトリを扱う広範囲なAPI
- pathモジュール - ファイル名やディレクトリ名を扱うユーティリティ
### 16.7.1 パス、ファイルディスクリプタ、FileHandler
`os`, `path`, `process`にはディレクトリ操作の便利なメソッドがある。

### 16.7.2 ファイルの読み込み
[実装例](./index.cjs)

### 16.7.3 ファイルの書き込み
書き込み方法は３種類
- ファイルの内容全体が文字列やバッファに格納されている場合
`fs.writeFile`, `fs.writeFileSync`, `fs.promises.writeFile`を使う。
※ファイルの上書きではなく、末尾に追加する場合は`fs.appendFile`などを使用すること。
- ファイアルに書き込みたいデータが１つのチャンクにまとまっていない、データが全てメモリにはない場合
`writable`ストリームを使う。

#### ファイルモード
下記のように指定する。"r", "w", "a", さらにそれらに+(readできる)をつけたものがある。
```javascript
fs.open(testCsvpath, "r", (err, fd) => {
    if (err) {
        return;
    }
    try {
        fs.read(fd, Buffer.alloc(400), 0, 400, 0, (e, b) => {
            console.log(b);
        })
    } finally {
        fs.close(fd);
    }
})
fs.writeFileSync("message.log", "hello", {flag: "a"});
```

### 16.7.4 ファイル操作
```javascript
// 基本的な同期式のファイルコピー。
fs.copyFileSync("ch15.txt", "ch15.bak");

// COPYFILE_EXCL引数は、新しいファイルがまだ存在してない場合にのみコピーする。
// 既存のファイルを上書きすることを防ぐ。
fs.copyFile("ch15.txt", "ch16.txt", fs.constants.COPYFILE_EXCL, err => {
    // このコールバックは完了時に呼び出される。エラー時、errは非nullになる。
});

// このコードは、copyFile関数のPromiseベースのものの使い方を紹介する。
// 2つのフラグは、ビット演算子のORである|演算子で結合する。これらの
// フラグでは、既存のファイルは上書きされないことを指定する。また、
// ファイルシステムがサポートしている場合は、コピーは元のファイルの
// コピーオンライトでの複製になるように指定する。コピーオンライトの
// 複製では、コピー元のファイルまたはコピー先のファイルが変更されるまで
// 追加の記憶領域が必要にならない。
fs.promises.copyFile("Important data",
                        `Important data ${new Date().toISOString()}",
                        fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE)
    .then(() => {
        console.log("Backup complete");
    });
    .catch(err => {
        console.error("Backup failed", err);
    });
```
`fs.rename`でファイルの移動やrenameができる。
`fs.unlink`でファイルの削除が行われれる。（ファイルの削除はそのファイルへのハードリンクを削除するのと同じことというUnixのお作法に倣った名前。）

### 16.7.5 ファイルのメタデータ
fs.statでファイルのメタデータを取得できる。

```javascript
const stats = fs.statSync(testCsvpath);
console.log(stats.isFile());
console.log(stats.isDirectory());
console.log(stats.uid); // 所有ユーザーのid
console.log(stats.atime); // アクセス日時
```
`fs.chmod`でファイルやディレクトリのモードを変更できる。(Linuxのchmodコマンドと同じ感じ)

### 16.7.6 ディレクトリの利用
`fs.mkdir`でディレクトリが作成できる。
recursiveがつくと、パスに存在していないディレクトリがあればそれも作成する。
```javascript
s.mkdirSync(path.join(__dirname, "/lib/sub"), { recursive: true});
```
ランダムなディレクトリを一時的に作成してすぐ消去するケースでは`fs.mkdtemp`を使うこと。
```javascript
let tempDirPath;

try {
    tempDirPath = fs.mkdtempSync(path.join(os.tempdir(), "d"));
    //何か処理する
} finally {
    fs.rmdirSync(tempDirPath);
}
```
ディレクトリの内容は２つの異なるAPIが使用できる
- `fs.readdir` - ディレクトリ全体を一度に読み込む。Direntオブジェクトの配列を取得することができる。
- `fs.opendir` - 何千もの項目がある場合に使用する。ストリーム方式でディレクトリの中身を取得できる。

