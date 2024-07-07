## 15.3 ドキュメントの制御
### 15.3.1 ドキュメント要素の選択
#### CSSセレクタによる要素の選択
CSSセレクタはタグ名やid属性値、class属性の要素を指定する。
```css
div       // 任意の<div>要素。
#nav      // id="nav"の要素
.warning  // class属性中に"warning"を含む任意の要素。

p[lang="fr"]  // フランス語で記述された段落：<p lang="fr">。
*[name="x"]   // name="x" という属性を持つ任意の要素。

span.fatal.error        // class中に"fatal"と"error"を含む<span>タグ。
span[lang="fr"].warning // classが"warning"のフランス語で記述された<span>タグ。

#log span           // id="log"という要素の子孫である任意の<span>タグ。
#log>span           // id="log"という要素の子要素である任意の<span>タグ。
body>h1:first-child // <body>の最初の<h1>子要素。
img + p.caption     // <img>タグの直後に、class中に"caption"を持つ<p>タグ。
h2 ~ p              // <h2>タグの後に続く<p>タグと、その兄弟要素であるすべての<p>タグ。
```
２つのセレクタがカンマで区切られている場合は、どちらか一方のセレクタにマッチする要素が選択される。
```css
button, input[type="button"]  // すべての<button>要素と<input type="button">要素。
```

CSSセレクタを使った要素の選択は下記メソッドで可能。（`document`だけではなく、`Element`でも可能。）
- `querySelector`
引数のCSSセレクタにマッチする最初の要素を返す。マッチしない場合は`null`を返す。
```javascript
// id="spinner"という属性をもつHTMLタグに対応するドキュメント要素を見つける。
let spinner = document.querySelector("#spinner");
```
- `querySelectorAll`
引数のCSSセレクタにマッチするすべての要素を`NodeList`(Array-Likeなオブジェクト)で返す。マッチしない場合は`length`が0の`NodeList`を返す。
```javascript
// <h1>、<h2>、<h3>タグに対応するすべてのElementオブジェクト。
let titles = document.querySelectorAll("h1, h2, h3");
```
