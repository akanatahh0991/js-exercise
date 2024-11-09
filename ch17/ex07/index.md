> TypeScriptのトランスパイルは`@babel/preset-typescript`や`tsc`によって可能だが、それぞれの違いを調べなさい。

### Babel
- トランスパイル（TypeScript -> JavaScriptへの変換）のみで型チェックは行わない。型チェックを行わない分、ビルドは高速。
- Babelの他のプラグインと併用できる。
- TypeScriptの一部の構文に未対応（namespaceなど）
- ES5以前のコードにトランスパイルできる。（Promiseなどのtscで変換できない組み込みオブジェクトに関してもPolyfillを注入できる。）

### tsc
- トランスパイルと型チェック両方をおこなう。ビルドは低速。
- `tsconfig.json`で詳細にカスタマイズすることができ、型ファイルの出力なども可能。
- ES5以前のコードにトランスパイルできるが、トランスパイルできるのはJavaScriptの構文だけで、Promiseなどの仕組みは置き換えられない。（IE11などで実行できない。）