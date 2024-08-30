# 練習問題解答プリセット

JavaScript および TypeScript の開発では一般にテストフレームワーク、フォーマッタ、Linter の OSS をダウンロードして実行できるようにします。このディレクトリは練習問題の解答用にそれぞれのデファクト OSS である Jest & Playwright、Prettier、ESLint を使えるようにしたプロジェクトのプリセットを提供します。それぞれの説明(Playwright 以外)は本の 17 章に記載されています。Playwright の使い方は[公式ページ等](https://playwright.dev/docs/intro)を確認してください。

JavaScript 版と TypeScript 版のプリセットを用意しています。どちらを使っても構いません。

また、これらのプリセットに従うことは強制ではありません。ルールを独自に追加変化除外しても構いません。また、慣れている、この際だから使ってみたい等の理由で、別のテストフレームワーク、フォーマッタ、Linter を使っても構いません。

## 動かし方

```sh
cd ts # もしくはcd js
npm install # 依存ライブラリのインストール
npx playwright install chromium # ブラウザテスト用のブラウザのインストール
npm run test # Node.jsのテスト(Jest)実行
npm run test:browser # ブラウザのテスト(Playwright)実行
```

## コマンド

- npm run test: Jest による Node.js の自動テストが実行されます
- npm run test:browser: Playwright によるブラウザの自動テストが実行されます
- npm run format: Prettier によるソースコードのフォーマットが実行されます
- npm run lint: ESLint によるソースコードの Lint が実行されます
- npm run server: ブラウザでアクセスするためのウェブサーバが起動します。 http://localhost:3000 でアクセスできます
- npx ts-node <実行したい ts ファイルのパス>: TypeScript のコードを JavaScript にトランスパイルせず Node.js 上で直接実行します (TypeScript 版プリセットのみ)

## Prettier と ESLint の適用除外設定

このプリセットの設定で Prettier や ESLint を使うと、問題によってはフォーマットされて解答できないことや、警告が回避できないことがあります。その場合それぞれ以下などを参考にして、ソース中のコメントや設定ファイルでフォーマットや警告の対象外にしてください。

- Prettier
  - [Ignoring Code · Prettier](https://prettier.io/docs/en/ignore.html)
- ESLint
  - [Configure Rules \- ESLint \- Pluggable JavaScript Linter](https://eslint.org/docs/latest/use/configure/rules#disabling-rules)
  - [Ignore Files \- ESLint \- Pluggable JavaScript Linter](https://eslint.org/docs/latest/use/configure/ignore)

## ts ファイルをブラウザ向けビルド対象にする設定

tsconfig.front.json を開き、[include](https://www.typescriptlang.org/tsconfig/#include)、[exclude](https://www.typescriptlang.org/tsconfig/#exclude)を編集して対象にしたいファイルが包含されるようにしてください。
