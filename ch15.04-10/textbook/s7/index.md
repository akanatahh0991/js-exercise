## 15.7 SVG(Scalable Vector Graphics)
グラッフィックを描画するために必要な手順を解像度に依存しない形式で記述したもの。XMLマークアップ言語を使ってテキスト形式で記述される。
Webブラウザ中でSVGを使う方法
1. `<img>`タグで使用する
2. HTMLドキュメント中にSVGタグを埋め込む
3. DOM APIを使って、動的にSVG画像を作成する

### 15.7.1 HTML中のSVG
[アナログ時計](./analogClock.html)を参照。
`<svg>`の中は通常のHTMLタグではない。スタイルシートもfill, stroke-widthなど通常のCSSスタイルとは異なる。

### 15.7.2 SVGの制御
imgタグを使わずにSVGをHTMLに埋め込むメリットはDOM APIによる操作ができる点である。

### 15.7.3 JavaScriptによるSVG画像の作成
SVGはXMLタグのため、JavaScriptのDOM APIを使ってSVG画像を作成する場合は`createElement`を使用できない。代わりに`createElementNS`を使用する。
この関数は第一引数にXML名前空間を取ります。SVGの場合、"http://www.w3.org/2000/svg"となる。
[チャート](./chart.html)を参照。

