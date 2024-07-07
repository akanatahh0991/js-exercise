## Framework
React

## ReactデフォルトのXSS対策
ReactではJSX内の式埋め込みではHTMLとして解釈されないようにエスケープ（無害化）される。

## ReactのXSSの危険性
- `dangerouslySetInnerHTML`
`dangerouslySetInnerHTML`はdeprecatedだが、利用すると上記のエスケープ処理が動作しなくなる。
- javascriptスキームを使ったXSS
<a> タグの href 属性に任意のスキームを設定できることを利用した XSS 脆弱性

[参考](https://azukiazusa.dev/blog/react-javascript-xss/)
