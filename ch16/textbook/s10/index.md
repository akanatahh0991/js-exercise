## 16.10 子プロセスとの連携
- `child_process` - 別のプログラムを子プロセスとして実行するための機能
### 16.10.1 execSyncとexecFileSync
- execSync - 第一引数に指定したシェルを同期的に実行する。第二引数にencodingを使用すると戻り値がバッファではなく文字列になる。エラー時は例外をthrowする。
  ```javascript
  const child_process = require("child_process);
  // コマンドはセミコロンで区切って複数指定することもできる。
  const listing = child_process.execSync("ls -l web/*.html",{encoding: "utf8"});
  ```
- execFileSync - コマンドラインを解析できない点に注意。シェルを起動するオーバーヘッドがなくなる。
  ```javascript
  const listing = child_process.execFileSync("ls", ["-l", "web/"], {encoding: "utf8"});
  ```

### 16.10.2 execとexecFile
execSyncとexecFileSyncの非同期版。並行で実行できる。Promiseを使うと便利。

### 16.10.3 spawn
execFileやexecFileSyncは結果をまとめてバッファや文字列で返すが、ストリームで受け取りたい場合もある。その場合はspawnを使用すること。
spanの返り値のChildProcessオブジェクトはstdout(結果のストリーム)、stderr(例外時のストリーム)、stdin(子プロセスへのWritableStream)をプロパティとしてもつ。
