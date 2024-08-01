## 15.6 Web Components
### 15.6.1 Web Componentsの使い方
```html
<script type="module" src="components/search-box.js">

<search-box placeholder="Search..."></search-box>
```
Web Componentsはタグ名にハイフンを使う必要がある。ハイフンを使うことで将来的にhtmlタグが増えても衝突しない。

slotという名前でラベル付けされた子要素を使用する場合は下記のように使用する。
```html
<search-box>
  <img src="images/search-icon.png" slot="left"/>
  <img src="images/cancel-icon.png" slot="right"/>
</search-box>
```
### DocumentFragmentノード
親ノードとは独立して兄弟ノードのグループを１つとして扱いたい場合に使用する。ドキュメントにappendした場合、子要素はすべて挿入されるが、DocumentFragment自体は挿入されない。
```javascript
document.createDocumentFragment
```
### 15.6.2 HTMLテンプレート
HTMLの`<template>`タグはWebブラウザに表示されない。JavaScriptで同じ構造を使い回すケースに使用する。HTMLテンプレートは`HTMLTemplateElement`で`content`にすべての子ノードをもつ`DocumentFragment`が格納される。次のように複製できる。
```javascript
let tableBody = document.querySelector("tbody");
let template = document.querySelector("#row");
let clone = template.content.cloneNode(true); // 深いコピーを作る。
// ...DOMを使ってコンテンツをコピーした<td>要素に挿入する。...
// 複製し、初期化した行をテーブルに追加する。
tableBody.append(clone);
```
テンプレートはHTMLドキュメント要素に記述しなくてよい。(JavaScript上でテンプレートを作成してinnterHTMLを使って子要素を作成すればいい。)

### 15.6.3 カスタム要素
JavaScriptのクラスをHTMLタグ名に関連づける機能。
[実装例](./index.js)を参照のこと。

### 15.6.4 シャドウDOM
HTML要素のカプセル化をおこなうための機構。シャドウルートの子孫要素は通常のDOMツリーから見えなくなる。
- シャドウホスト(カスタム要素や`<div>`, `<p>`などのHTML要素)にシャドウルートを接続できる。
- シャドウルートはopen/closeを指定できるが、closeした場合は外部アクセス不可のため、通常はopenを使う。
- シャドウホストは`shadowRoot`プロパティをもつ。シャドウルートへのアクセスに使用できる。
- シャドウルートの下で定義されたスタイルはシャドウDOMに閉じたものになる。シャドウDOMの要素はライトDOMのCSS変数を使用できる。
- シャドウDOM内で発生する`load`などのイベントはシャドウDOM内に閉じられる。フォーカスやマウス、キーボードイベントは伝搬してシャドウDOMの外に伝搬する。その場合、イベントの`target`プロパティはシャドウホスト要素に変更される。

#### シャドウDOMのスロットとライトDOMの子要素
HTML要素がシャドウホストの場合、`children`にライトDOMの子孫要素、`shadowRoot`にシャドウルートと子孫要素をもつ。

[シャドウDOM](https://qiita.com/KokiSakano/items/21e511313e64e70c2221)

