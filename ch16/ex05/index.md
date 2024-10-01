> 1. 標準入力、標準出力、標準エラー出力、リダイレクト、パイプという単語について調べなさい
### 標準入力
プログラムがデータを受け取る入力先。キーボードなどが主な標準入力。
### 標準出力
プログラムがデータを出力する出力先。ディスプレイなどが主な標準出力。
### 標準エラー出力
プログラムがエラーメッセージや警告メッセージを出力する出力先.
標準出力とは別の書き出し先に出力される。
### リダイレクト
標準入出力や標準エラー出力をファイルに置き換える機能
### パイプ
あるプログラムの出力を別のプログラムの入力に引き渡す機能

> 2. 以下のコードを `cat.mjs` というファイルに保存し、後述する実験の結果を予測し、実際に実験しなさい

```js
import fs from "fs";

if (process.argv.length > 2) {
  // node cat.js foo.txt といった形式ならばファイルを読み込み標準出力に出力する
  fs.createReadStream(process.argv[2]).pipe(process.stdout);
} else {
  // そうでなければ標準入力を標準出力に出力する
  process.stdin.pipe(process.stdout);
}
```
- `node cat.mjs`
標準入力が求められ、入力するとその値が標準出力される。
- `echo FOO | node cat.mjs`
FOOと標準出力される
- `node cat.mjs > output.txt`
標準入力した値がoutput.txtに保存される。
- `node cat.mjs file`
fileの中身が標準出力される。
- `node cat.mjs file > output.txt`
fileの中身がoutput.txtに保存される。
- `node cat.mjs invalid-file > output.txt`
ファイルが存在しないため、エラーが標準エラー出力される。`>`は標準出力からのリダイレクトのため、output.txtには何も保存されない。
- `node cat.mjs invalid-file 2> error.txt`
ファイルが存在しないためのエラーが標準エラー出力となり`2>`で標準エラー出力がリダイレクトされerror.txtに保存される。