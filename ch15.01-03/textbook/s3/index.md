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

**💡** **下記の[擬似要素](https://developer.mozilla.org/ja/docs/Web/CSS/Pseudo-elements)にはマッチしない。**

::before
::after
::first-line
::first-letter
::placeholder

- `closest`
`Element`で定義されている。引数のセレクタにマッチした場合はその要素、マッチしなかった場合はその祖先（親、親の親、、、）を辿ってマッチする要素を探して最近傍の要素を返す。マッチする要素がない場合は`null`を返す。
`querySelector`とは逆向きに辿る。

```javascript
// href属性を持つ最近傍の<a>タグを探す。
let hyperlink = event.target.closest("a[href]");

// 要素eがHTMLのリスト要素中に含まれる場合はtrueを返す。
function insideList(e) {
    return e.closest("ul,ol,dl") !== null;
}
```

- `matches`
要素がCSSセレクタにマッチするかどうかを調べ、マッチする場合はtrueを返す。マッチしない場合はfalseを返す。
```javascript
// eがHTMLの見出し要素の場合はtrueを返す。
function isHeading(e) {
    return e.matches("h1,h2,h3,h4,h5,h6");
}
```
**💡** **getElementById、getElementByTagName、getElementByClassNameなどはdeprecated**

#### 事前に選択されている要素
`Document`クラスにある種のノードに簡単にアクセスするためのプロパティがある。
- images - `<img>`要素
- forms - `<form>`要素
- links - hrefをもつ`<a>`要素

`HTMLCollection`オブジェクトが返される。
```javascript
// <form id="address">へのアクセス
document.forms.address;
```

### 15.3.2 ドキュメント構造と探索
ドキュメント構造上で関係する部分（親、兄弟、子）を探索する場合は、`Element`オブジェクトのトラバースAPIが使用できる。
- `parentNode` - この要素の親となる要素(Element or Documentオブジェクト)
- `children` - ある要素の子要素となるElement群を含むNodeList。TextノードやCommentノードなどのElementノード以外の子要素は含まれない。
- `childElementCount` - 子要素のElementオブジェクトの数。`children.length`と同じ値が返る
- `firstElementChild`、`lastElementChild` - それぞれ、あるElementの最初と最後の子Elementを参照します。子Elementがない場合はnullになります。
- `nextElementSibling`、`previousElementSibling` - これらのプロパティは、あるElementの直前、直後の兄弟Elementを参照します。そのような兄弟Elementが存在しない場合はnullになります。

例: Documentの最初の子のElementの２番目の子Element
```javascript
document.children[0].children[1];
document.firstElementChild.firstElementChild.nextElementSibling;
```
#### ノードツリーとしてのドキュメント
Textなどの全てのNodeオブジェクトを探索対象とする場合はNodeオブジェクトの下記メソッドを使う。
- `parentNode` - このNodeの親となるNode。Documentオブジェクトなど、親ノードがないノードの場合はnullになります。
- `childNodes` - Nodeの子ノードを（Elementだけではなく）すべて含んだ読み出し専用のNodeList。
- `firstChild`、`lastChild` - ノードの子ノードのうち、最初の子ノードと最後の子ノード。子ノードを持たないノードの場合はnullになります。
- `nextSibling`、`previousSibling` - ノードの兄弟ノード。同じ親ノードを持つノードが兄弟ノードになります。これらのプロパティでは、双方向リンクリストを使ってノードを接続します。
- `nodeType` - ノードの種類を表す数値。Documentノードの場合は、値が9になります。Elementノードの場合は1、Textノードの場合は3、Commentノードの場合は8です。
- `nodeValue` - TextノードやCommentノードのテキストコンテンツ。
- `nodeName` - ElementのHTMLタグ名。大文字に変換されます。

**💡** **このAPIはドキュメントのテキストの変化に大きく影響を受ける。<html>と<head>の間に改行を１文字挿入してドキュメントを変更した場合、この改行を表すTextノードが最初の子要素の最初の子要素となる。**

ドキュメント中の全てのテキストを返す実装
```javascript
// 要素eのテキストコンテンツを返す。子要素についても再帰的に行う。
// このメソッドはtextContentプロパティと同じ働きをする。
function textContent(e) {
    let s = "";                         // この変数にテキストを集める。
    for(let child = e.firstChild; child !== null; child = child.nextSibling) {
        let type = child.nodeType;
        if (type === 3) {               // Textノードであれば、
            s += child.nodeValue;       // テキストコンテンツを文字列に連結していく。
        } else if (type === 1) {        // Elementノードであれば、
            s += textContent(child);    // 再帰的に処理を行う。
        }
    }
    return s;
}
```
### 15.3.3 属性
属性は名前と値のペア。例として、`<a>`要素ではhref属性を使ってリンク先を指定できる。
Elementクラスでは下記のメソッドで属性の読み書き、テスト、削除ができる。
- getAttribute
- setAttribute
- hasAttribute
- removeAttribute
ただ、標準のHTMLElementの場合は、オブジェクトのプロパティで属性値の読み書き、テスト、削除を行う。

#### class属性
class属性の値は、スペースで区切られたCSSクラス。CSSクラスが要素に適用されて、CSSを使ってどのようなスタイルにするかを決める。class属性値はJavaScriptではclassNameプロパティから利用できる。
HTMLのclass属性は複数指定できるので、リストで扱う場合はclassListプロパティを使うとよい。

#### データセット属性
HTML要素に情報を追加する際は、`data-xxx`という属性値を使用する。JavaScriptからは`dataset.xxx`という形でアクセスできる。ハイフン部分は省略され、キャメルケースになる点に注意すること。
```html
<h2 id="title" data-section-number="16.1">Attributes</h2>
```
```javascript
const number = document.querySelector("#title").dataset.selectionNumber;
```
### 15.3.4 要素のコンテンツ
Elementの`innerHTML`プロパティを読み出せば、マークアップを含んだ文字列形式として、要素のコンテンツが返される。
```javascript
document.body.innerHTML = "<h1>Oops</h1>";
```
Elementの`outerHTML`プロパティは値に要素自体が含まれる。そのため、書き換え時には要素ごと置き換えられる。

プレーンテキストとして取得する場合は`textContent`を使う

### 15.3.5 ノードの作成、挿入、削除
`append`も`prepend`も可変引数として`Node`または`string`を受け付ける。
- `append` - 子リストの最後の要素に引数を追加する
- `prepend` - 子リストの先頭に引数を追加する。
```javascript
const paragraph = document.createElement("p");  // 空の<p>要素を作成する。
const emphasis = document.createElement("em");  // 空の<em>要素(強調表現)を作成する。
emphasis.append("World");                     // <em>要素にテキストを追加する。
paragraph.append("Hello ", emphasis, "!");    // <p>にテキストと<em>を追加する。
paragraph.prepend("¡");                       // さらに、<p>の先頭にテキストを追加する。
paragraph.innerHTML                           // => "¡Hello <em>World</em>!"
```
要素の子リストの途中にElementノードやTextノードを挿入する場合は、兄弟ノードの参照を取得して、`before`または`after`でコンテンツを追加する。
```javascript
// class="greetings"を持つ見出し要素を探す。
const greetings = document.querySelector("h2.greetings");

// 見出しの後に、新しい段落と水平線を挿入する。
greetings.after(paragraph, document.createElement("hr"));
```
要素はドキュメント中の１つの場所にしか挿入できない。要素をコピーして他の場所にも挿入したい場合は、`cloneNode`を使用する。引数に`true`を渡すと、要素だけではなく要素のコンテンツもすべてコピーされる。
```javascript
// 段落のコピーを作成し、greetings要素の後に挿入する。
greetings.after(paragraph.cloneNode(true));
```
ドキュメントからElementノードやTextノードを削除する場合
```javascript
// ドキュメントからgreetings要素を削除し、paragraph要素で
// 置換する（すでにドキュメント中に挿入されていた場合、
// paragraph要素は現在の位置から移動する）。
greetings.replaceWith(paragraph);

// さらに、paragraphも削除する。
paragraph.remove();
```