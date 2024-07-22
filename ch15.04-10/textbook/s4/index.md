## 15.4 CSSの制御
### 15.4.1 CSSクラス
`Element`の`classList`プロパティを使えばコンテンツのスタイルを変えられる。
```css
.hidden {
  display:none;
}
```
```javascript
// この「tooltip」要素はHTMLファイル中でclass="hidden"という属性をつけていると想定。
// 次のようなコードでこの要素を表示できる。
document.querySelector("#tooltip").classList.remove("hidden");

// また、次のようなコードで非表示にできる。
document.querySelector("#tooltip").classList.add("hidden");
```
### 15.4.2 インラインスタイル
`style`属性(`CSSStyleDeclaration`)を使用してインラインスタイルの変更ができる。
`CSSStyleDeclaration`のプロパティに指定する値はすべて文字列。C
```javascript
function displayAt(tooltip, x, y) {
    tooltip.style.display = "block";
    tooltip.style.position = "absolute";
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}
```
ある要素のインラインスタイルを全て取得したり、変更する場合は`Element`の`getAttribute/setAttribute`を使った方がいい。
あるいは、`CSSStyleDeclaration`オブジェクトの`cssText`も使用できる。
```javascript
// 要素eのインラインスタイルを要素fにコピーする。
f.setAttribute("style", e.getAttribute("style"));
// または次のように記述してもよい。
f.style.cssText = e.style.cssText;
```
**💡** **styleプロパティは要素のインラインスタイルのみ保持し、スタイルシートで指定される値は読み取れない。**

### 15.4.3 算出スタイル
ある要素の算出スタイルは、インラインスタイルの他に全てのスタイルシート中の適用可能なスタイルからブラウザが算出したプロパティのセット。
このセットが実際に要素を表示する際に使用される。
算出スタイルは読み取り専用で`window`オブジェクトの`getComputedStyle`で取得できる。
```javascript
let title = document.querySelector("#section1title");
let styles = window.getComputedStyle(title);
let beforeStyles = window.getComputedStyle(title, "::before");
```
以下の点に注意すること
- 算出スタイルは読み出し専用
- 算出スタイルのプロパティは絶対値
- 算出スタイルでは一括指定プロパティ(marginやborderなど)は算出されない
- 算出スタイルのcssTextは未定義

### 15.4.4 スタイルシートの制御
