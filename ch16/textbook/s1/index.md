# Node上のサーバサイドJavaScript
NodeはOSと結びついたJavaScript。シングルスレッドのイベントベースの並行性が特徴。

## 16.1 Nodeプログラミングの基礎
### 16.1.2 コマンドライン引数と環境変数
- `process.argv` - コマンドライン引数。配列の0番目はNodeの実行ファイルのパス、1番目はNodeが実行しているファイルのパス。残りはコマンドラインで渡したスペースで区切られた引数。
  ```
    s1 % node index.js aaa 4 5 1.5 null
    [
    '/Users/hiroatsu/.nodebrew/node/v18.20.4/bin/node',
    '/Users/hiroatsu/Develop/JavaScript/js-exercise/ch16/textbook/s1/index.js',
    'aaa',
    '4',
    '5',
    '1.5',
    'null'
    ]
  ```
- `process.env` - 環境変数。
### 16.1.3 プログラムのライフサイクル
Nodeプログラムは非同期のため、コールバックやイベントハンドラベースになっているのが普通。初期ファイルの実行を終了し、すべてのコールバックを呼び出して処理待ちイベントがなくなるまで終了しない。
- `process.exit` - 強制的にプログラムを終了
- `process.on("SIGINT", () => {})` - Ctl + Cを無視

#### Promise以外の場合の例外処理
プログラムでコードが例外をスローし、catchされない場合はクラッシュする。クラッシュを防ぐためには以下の実装をおこなうこと。
```javascript
process.setUncaughtExceptionCaptureCallback(e => {
    console.error("Uncaught exception:", e);
});
```

#### Promiseの場合の例外処理
Promise内で処理されない例外は致命的なエラーになる可能性がある。それらを防ぐ場合は、以下の実装をおこなうこと。
```javascript
process.on("unhandledRejection", (reason, promise) => {
    // reasonには、.catch()関数に渡されたであろう値。
    // promiseは失敗したPromiseオブジェクト。
});
```
### 16.1.4 Nodeモジュール
- cjs拡張子 - commonjsとして扱われる
- mjs拡張子 - esmoduleとして扱われる
- どちらでもない時 - package.jsonファイルの`type`プロパティが"module"の場合はES6として扱う。それ以外はCommonJSとして扱う。

ES6モジュールからCommonJSモジュールの読み込みはimportでできるが、逆はできない。

### Nodeパッケージマネージャー
npmがNodeのパッケージマネージャー。ライブラリの依存関係を管理してpackage.jsonに記録する。