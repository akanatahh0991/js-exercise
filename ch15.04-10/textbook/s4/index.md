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
`CSSStyleDeclaration`のプロパティに指定する値はすべて文字列。
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
スタイルシートの適用方法
- `<style>`タグを使う。[参考](https://developer.mozilla.org/ja/docs/Web/HTML/Element/style)
- `<link rel="stylesheet>`タグを使う。←こちらが推奨
`<style>`も`<link>`もHTMLタグなのでidを使ってElementオブジェクトとして制御できる。`disable`プロパティを使ってスタイルシートの無効化も可能。
```javascript
// この関数は「light」テーマと「dark」テーマを切り替える。
function toggleTheme() {
    let lightTheme = document.querySelector("#light-theme");
    let darkTheme = document.querySelector("#dark-theme");
    if (darkTheme.disabled) {     // lightテーマの場合は、darkテーマに切り替える。
        lightTheme.disabled = true;
        darkTheme.disabled = false;
    }   else {                    // darkテーマの場合は、lightテーマに切り替える。
        lightTheme.disabled = false;
        darkTheme.disabled = true;
    }
}
```
DOMを使ってドキュメントに新しいスタイルシートを挿入する方法もある。
```javascript
function setTheme(name) {
    // 新しい<link rel="stylesheet">要素を作成し、スタイルシートを読み込ませる。
    let link = document.createElement("link");
    link.id = "theme";
    link.rel = "stylesheet";
    link.href = `themes/${name}.css`;

    // 「theme」というidを持つ既存の<link>タグを探す。
    let currentTheme = document.querySelector("#theme");
    if (currentTheme) {
        // 既存のテーマがあれば、新しいテーマで置き換える。
        currentTheme.replaceWith(link);
    } else {
        // 既存のテーマがない場合は、テーマ用のスタイルシートを挿入するだけ。
        document.head.append(link);
    }
}
```
JavaScriptからスタイルシート中のスタイルルールを操作する[API](https://developer.mozilla.org/ja/docs/Web/API/CSS_Object_Model)がブラウザに定義されている。
### 15.4.5 CSSアニメーションとイベント
下記の場合、透明度が0.5sの徐々に早まるアニメーションで透明になる。
```css
.transparent { opacity: 0; }
.fadeable { transition: opacity .5s ease-in }
```
```html
<div id="subscribe" class="fadeable notification">...</div>
```
```javascript
document.querySelector("#subscribe").classList.add("transparent");
```
CSSのトランジションの状況を監視するイベント
- `transitionrun` - トランジションが始まった時
- `transitionstart` - 見た目が変わり始めた時
- `transitionend` - アニメーションが終了した時
イベントオブジェクトは`TransitionEvent`。
- `propertyName` - アニメーションしているCSSのプロパティ
- `elapsedTime` - `transitionstart`イベントからの経過時間（`transitionend`イベントの場合のみ）
CSSアニメーションを使うとさらに複雑なアニメーションを実現できる。
