> グローバルオブジェクトを参照する方法
### ブラウザ内
`window`でアクセス。
### node内
`global`でアクセス。
### ブラウザとnode問わず
`globalThis`でアクセス。

> ブラウザとnodeのグローバルオブジェクトのプロパティやメソッドを比較し、ブラウザ独自のものを10程度記しなさい。

- crypto
- cookieStore
- document
- forcus
- frames
- innerHeight
- innerWidth
- isSecurityContent
- navigation
- navigator

> グローバルオブジェクトにundefinedが定義されていることを確認し、過去のES仕様でどのような問題が発生していたかを記しなさい。

ECMAScript5より前は`window.undefined`は書き込み可能であった。そのため、varでundefinedが定義された場合や、`window.undefined`を別の値に書き換えている可能性があり、`void 0`を回避策で使っていたという問題があった。