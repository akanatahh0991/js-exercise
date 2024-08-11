## 15.8 `<canvas>`中のグラフィック
canvas APIとSVGとの違い
- canvas API - JavaScriptベースで、メソッドを呼び出すことで描画する。描画内容を変更する場合は再描画が必要となる。
- SVG - XMLベースで、定義から要素を変更することで簡単に編集できる。

`canvas.getContext("2d)`などで得られる描画コンテキスト(`CanvasRenderingContext2D`)を使用してCanvas描画APIは使用する。

[簡単なCanvasのサンプル](simpleCanvas.html)

これから示す例では以下で定義された描画コンテキスト`c`を使用する。
```javascript
let canvas = document.querySelector("#my_canvas_id");
let c = canvas.getContext('2d');
```
### 15.8.1 パスとポリゴン
線を描画したり、囲まれた領域を塗りつぶす際にはパスを定義する。パスは１つ以上のサブパスが連続したもの。サブパスは直線または曲線によって接続された２つ以上の点の連続。
```javascript
c.beginPath();      // 新しいパスを開始する。
c.moveTo(100, 100); // (100,100)からサブパスを開始する。
c.lineTo(200, 200); // (100,100)から(200,200)までの直線を追加する。
c.lineTo(100, 200); // (200,200)から(100,200)までの直線を追加する。
//上記までだと何も描画されない。
// strokeすることで直線が表示され、fillで塗りつぶされる。
c.fill();   // 三角形の領域を塗りつぶす。
c.stroke(); // 三角形の2辺を打ち付ける。
```
サブパスを閉じるためには`closePath`を使用する。
別のパスを開始したい場合は、`biginPath`を新しく呼び出す必要がある。
[多角形の実装例](polygon.js)

### 15.8.2 キャンバスの大きさと座標
- 原点は左上角。右に進めばXが増加、下に進めばYが増加。
- キャンバスを完全にリセットせずにキャンバスの大きさは変えられない。
  - width/heighを変えると現在のパスは消去される
- widthとheighにはキャンバスが画面上に表示される際のピクセル数を指定する。１ピクセルあたり４バイトのメモリが割り当てられる。
- 画質を最適化する場合は、CSSのwidthやheighスタイルを使ってwindow.devicePixelRatioを掛けた値を設定する。

### 15.8.3 グラフィック属性
グラフィック状態と描画命令は分離している。
- fillStyle - fillで使用される色
- strokeStyle - strokeで使用される色
- lineWidth - strokeで使用される線の幅

#### 線のスタイル
パスを繋ぐ場合の頂点の見た目に影響するプロパティは`lineCap`と`lineJoin`。
破線や点線は`setLineDash`を使用する。
```javascript
c.setLineDash([18, 3, 3, 3]); // 18pxの線、3pxのスペース、3pxの点、3pxのスペース。
```
#### 色、パターン、グラデーション
`fillStyle`と`strokeStyle`でパスの塗りつぶし方法と描画方法を指定する。
- 単色や半透明色で塗りつぶす - CSS色文字列を指定する
- グラデーション色を使って塗りつぶす - `c.createLineearGradient`メソッド(引数には２点の座標を指定)または`c.createRadialGradient`メソッド（２つの円の中心と半径を指定）から返される`CanvasGradient`を使う
- 画像を使って塗りつぶす - `c.createPattern`メソッドから返される`CanvasPattern`を使う
```javascript
// キャンバスの対角線上に線形のグラデーション色（座標変換していないと想定）。
const bgfade = c.createLinearGradient(0,0,canvas.width,canvas.height);
bgfade.addColorStop(0.0, "#88f"); // 左上は明るい青色。
bgfade.addColorStop(1.0, "#fff"); // 右下に向かって白色に薄れていく。

// 2つの同心のグラデーション。中心では透明。
// 放射線状に半透明の灰色に遷移し、再び透明に戻る。
const donut = c.createRadialGradient(300,300,100, 300,300,300);
donut.addColorStop(0.0, "transparent");           // 透明。
donut.addColorStop(0.7, "rgba(100,100,100,.9)");  // 半透明の灰色。
donut.addColorStop(1.0, "rgba(0,0,0,0)");         // 再び透明。
```

#### テキストスタイル
`canvas`の`font`プロパティは`fillText`や`strokeText`などのテキスト描画メソッドで使われるフォントを指定する。`textAlign`プロパティは水平方向の配置方法(start, end, center)を指定する。`textBasline`はY座標に対してテキストを垂直方向にどのように配置するかを指定する。

#### 影
- `shadowColor` - 影の色を指定できる。デフォルトは透明な黒で、このプロパティに半透明または不透明な色を設定しない限り、影は表示されない。
- `shadowOffsetX`, `shadowOffsetY` - 影のオフセットを設定できる。両方のプロパティとも、デフォルトは0で影は表示されない。正値を代入すると、右下に影ができる。
- `shadowBlur` - 影の端をどのようにぼかすかを指定する
  
#### 透明度
`globalAlpha` - 描画するピクセルは、ピクセル自身のアルファ値に`globalAlpha`を乗算した値を透明度とする。

#### 合成
新しいピクセルと既存のコピー先のピクセルと組み合わせる処理を合成という。
`globalCompositeOperation`で合成方法を指定できる。デフォルトは`source-over`（新しいピクセルが上にくる）。`destination-over`は新しいピクセルが下にくる。他にも設定値があるので、API仕様を参照。

#### グラフィック状態の保存と復元
`<canvas>`ごとにコンテキストオブジェクトは１つ。グラフィック属性を保存するには`save`を呼び出す。`restore`すると、最後に`save`された設定が復元される。

#### キャンバスの描画処理
- 矩形 - CanvasRenderingContext2Dには、矩形を描画するためのメソッドが4つ定義されています。これらの4つの矩形描画メソッドはすべて、矩形の1つの角を表す2つの引数と、矩形の幅と高さを表す引数を受け取ります。通常、左上角を指定し、正数の幅と高さを指定します。
- 曲線 - `arc`, `ellipse`, `arcTo`などを使用する
- テキスト
- 画像
  - ベクターグラフィックの他にCanvas APIではビットマップ画像もサポートしている。`drawImage`はソースとなる画像からキャンバスに対してピクセルをコピーする。

### 15.8.5 座標変換
キャンバスのデフォルトの座標系は左上角が原点。座標系を変換する場合は、現在の座標変換行列を使用する。
- `setTransform` - キャンパスの座標変換行列を指定する。
- `translate` - 座標原点を上下左右に移動する
- `rotate` - 座標軸を時計回り方向に指定した角度だけ回転させる。（ラジアンで指定すること。）
- `scale` - X軸、Y軸を拡大縮小する。負数を入れると鏡に写したように座標軸が反転する。

### 15.8.6 クリッピング
クリッピング領域を指定すると、この領域の外側には何も描画されない。
```javascript
// 描画属性を定義する。
c.font = "bold 60pt sans-serif";    // 大きなフォント。
c.lineWidth = 2;                    // 細い線
c.strokeStyle = "#000";             // 黒色の線。

// 矩形とテキストの輪郭を描く。
c.strokeRect(175, 25, 50, 325);     // 中央に垂直な帯を描く。
c.strokeText("<canvas>", 15, 330);  // fillText()の代わりに strokeText()を使う。

// 内部に空洞のある複雑なパスを定義する。
polygon(c,3,200,225,200);           // 大きな三角形。
polygon(c,3,200,225,100,0,true);    // 内側に反時計回りに小さな三角形。

// このパスをクリッピング領域にする。
c.clip();

// クリッピング領域の内側に、5ピクセルの線をパスに沿って描画する。
c.lineWidth = 10;                   // 10ピクセル幅の線の半分はクリッピングされる。
c.stroke();

// 矩形とテキストのクリッピング領域中の部分を塗りつぶす。
c.fillStyle = "#aaa";               // 明るい灰色。
c.fillRect(175, 25, 50, 325);       // 垂直の帯を塗りつぶす。
c.fillStyle = "#888";               // 暗めの灰色。
c.fillText("<canvas>", 15, 330);    // テキストを塗りつぶす。
```
### 15.8.7 ピクセル操作
`getImageData`は`ImageData`オブジェクトを返す。この`ImageData`はキャンバスの矩形領域の生ピクセルを表すオブジェクト。`createImageData`を使って空の`ImageData`を生成可能。また、`putImageData`を使ってキャンバスにコピーしたりできる。`putImageData`はすべてのグラフィック属性を無視する。
```javascript
// 矩形のピクセルを右側ににじませることで、オブジェクトが右から左に
// 移動したかのように見せる。一種のモーションブラー効果を作成する。
// nには2以上を指定しなければならない。値を大きくすれば、にじみも大きくなる。
// 矩形は、デフォルトの座標系で指定する。
function smear(c, n, x, y, w, h) {
    // にじませるピクセルの矩形を表すImageDataオブジェクトを取得する。
    let pixels = c.getImageData(x, y, w, h);

    // にじみ効果は元の画像上で行われるので、ソースのImageDataだけが必要。
    // 画像処理アルゴリズムによっては、変換したピクセル値を保存するために
    // 別のImageDataが必要になるものもある。出力バッファが必要な場合は、
    // 次のようなコードで同じ大きさのImageDataを作成することができる。
    //   let output_pixels = c.createImageData(pixels);

    // ImageDataオブジェクト内の寸法（ピクセル数）を取得する。
    let width = pixels.width, height = pixels.height;

    // 次のデータは生のピクセルデータを保持するバイト配列。左から右、上から下に
    // 格納されている。ピクセルごとに4つの連続するバイトで RGBA順に格納される。
    let data = pixels.data;

    // 各行の2番目以降のピクセルを、そのピクセルの値の1/n と、
    // 直前のピクセルの値のm/nを加算した値にする。
    let m = n-1;

    for(let row = 0; row < height; row++) {             // 行ごとに。
        let i = row*width*4 + 4;                        // 行の2番目のピクセルのオフセット。
        for(let col = 1; col < width; col++, i += 4) {  // 列ごとに。
            data[i] =   (data[i] + data[i-4]*m)/n;      // ピクセルの赤色要素。
            data[i+1] = (data[i+1] + data[i-3]*m)/n;    // 緑。
            data[i+2] = (data[i+2] + data[i-2]*m)/n;    // 青。
            data[i+3] = (data[i+3] + data[i-1]*m)/n;    // アルファ要素。
        }
    }

    // ここで、にじませた画像をキャンバスの同じ位置にコピーして戻す。
    c.putImageData(pixels, x, y);
}
```
