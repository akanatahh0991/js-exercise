// 頂点は円周上に等間隔で配置される。
// 最初の頂点は真上か、指定した角度に配置する。
// 最後の引数がtrueでない限り、時計回りに配置していく。
function polygon(c, n, x, y, r, angle = 0, counterclockwise = false) {
  c.moveTo(
    x + r * Math.sin(angle), // 最初の頂点から新しいサブパスを開始する。
    y - r * Math.cos(angle)
  ); // 三角関数を使って位置を計算する。
  let delta = (2 * Math.PI) / n; // 頂点間の角度距離を求める。
  for (let i = 1; i < n; i++) {
    // 残りの頂点ごとに、
    angle += counterclockwise ? -delta : delta; // 角度を調節する。
    c.lineTo(
      x + r * Math.sin(angle), // 次の頂点に直線を引く。
      y - r * Math.cos(angle)
    );
  }
  c.closePath(); // 最後の頂点と最初の頂点を接続する。
}

// キャンバスは1つだけと想定。コンテキストオブジェクトを取得して描画する。
let c = document.querySelector("canvas").getContext("2d");

// 新しいパスを開始し、多角形のサブパスを追加する。
c.beginPath();
polygon(c, 3, 50, 70, 50); // 三角形。
polygon(c, 4, 150, 60, 50, Math.PI / 4); // 矩形。
polygon(c, 5, 255, 55, 50); // 五角形。
polygon(c, 6, 365, 53, 50, Math.PI / 6); // 六角形。
polygon(c, 4, 365, 53, 20, Math.PI / 4, true); // 六角形の中の小さな矩形。

// プロパティを設定して、グラフィックの見た目を制御する。
c.fillStyle = "#ccc"; // 内側は薄い灰色。
c.strokeStyle = "#008"; // 暗い青色の直線で辺を描く。
c.lineWidth = 5; // 幅は5ピクセル。

// 次の呼び出しで、すべての多角形を描画する。多角形はそれぞれサブパスで定義。
c.fill(); // 多角形を塗りつぶす。
c.stroke();
