## 15.5 ドキュメントの位置とスクロール
### 15.5.1 ドキュメント座標とビューポート座標
ビューポート座標（ウィンドウ座標）を基本的に使用する。
### 15.5.2 要素(`Element`)のジオメトリの取得
- `getBoundingClientRect` - 要素の大きさ（CSSのボーダーとパディングは含み、マージンは含みません）と、位置（ビューポート座標）を取得できる。
- `getClientRects` - インラインの要素の個々の矩形を調べる場合に使用する。要素は`getBoundingClientRect`で取得できるオブジェクトの配列となる。

### 15.5.3 位置から要素を取得
`Document`の`elementFromPoint`にビューポート座標（マウスイベントのclientX, clientYなど）を指定すると、指定した位置の最も内側で（最も深く入れ子になっていて）、最前の（CSSのz-indexが一番大きい）要素を返す。

### 15.5.4 スクロール
- `Window`の`scrollTo` - ドキュメント座標を渡すと、スクロール位置を設定する。
```javascript
// ドキュメントとビューポートの高さを取得する。
let documentHeight = document.documentElement.offsetHeight;
let viewportHeight = window.innerHeight;
// そして、ビューポート中に最後の「ページ」を表示するようにスクロールする。
window.scrollTo(0, documentHeight - viewportHeight);
```
- `Window`の`scrollBy` - こちらは相対位置を指定する
scrollTo()やscrollBy()を使ってスムーズにスクロールしたい場合は、数値ではなく、次のようなオブジェクトを引数として渡す。
```javascript
window.scrollTo({
  left: 0,
  top: documentHeight - viewportHeight,
  behavior: "smooth"
});
```
- `Element`の`scrollIntoView` - ドキュメント中の要素がみえるようにスクロールする。

### 15.5.5 ビューポートの大きさ、コンテンツの大きさ、スクロール位置
- ブラウザウィンドウのビューポートの大きさ - `window.innerWidth`と`window.innerHeight`
- ドキュメントの大きさ - `document.documentElement.offsetWidth/offsetHeight`

`Element`について
- `offset****`はボーダーとパディングを含む
- `client****`はパディングのみ含む
