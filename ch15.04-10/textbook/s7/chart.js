/**
 * <svg>要素を作成し、この要素の中に円グラフを描画する。
 *
 * この関数は次のようなプロパティを持つオブジェクトを引数として受け取る:
 *
 *   width、height: SVGグラフィックの大きさ。ピクセル単位で指定する。
 *   cx、cy、r: 円グラフの中心と半径。
 *   lx, ly: 円グラフの凡例の左上角座標。
 *   data: このオブジェクトのプロパティ名がデータのラベルとなり、プロパティの値が
 *          各ラベルに関連付けられた値となる。
 *
 * この関数は<svg>要素を返す。表示するには、呼び出し元で、戻り値の要素を
 * ドキュメント中に挿入しなければならない。
 */
function pieChart(options) {
    let {width, height, cx, cy, r, lx, ly, data} = options;

    // svg要素用のXML名前空間。
    let svg = "http://www.w3.org/2000/svg";

    // <svg>要素を作成し、ピクセル単位で大きさとユーザ座標を指定する。
    let chart = document.createElementNS(svg, "svg");
    chart.setAttribute("width", width);
    chart.setAttribute("height", height);
    chart.setAttribute("viewBox", `0 0 ${width} ${height}`);

    // 円グラフで使用するテキストスタイルを定義する。ここで設定しない場合は、
    // 代わりにCSSを使って設定できる。
    chart.setAttribute("font-family", "sans-serif");
    chart.setAttribute("font-size", "18");

    // 配列としてラベルと値を取得し、値の総和を計算し、円グラフ全体の大きさを
    // 求める。
    let labels = Object.keys(data);
    let values = Object.values(data);
    let total = values.reduce((x,y) => x+y);

    // すべての扇形の角度を計算する。扇形iは、angles[i]から始まり、
    // angles[i+1]で終わる。角度の単位はラジアン。
    let angles = [0];
    values.forEach((x, i) => angles.push(angles[i] + x/total * 2 * Math.PI));

    // ループを使って、各扇形に対して処理を行う。
    values.forEach((value, i) => {
        // 扇形と円弧が交差する2点を計算する。
        // 以下の式では、0度を12時の方向として選び、角度が増えるのは
        // 時計回りの方向としている。
        let x1 = cx + r * Math.sin(angles[i]);
        let y1 = cy - r * Math.cos(angles[i]);
        let x2 = cx + r * Math.sin(angles[i+1]);
        let y2 = cy - r * Math.cos(angles[i+1]);

        // 角度が半円よりも大きくなった場合のためのフラグ。
        // SVGで円弧を描画する場合は必要。
        let big = (angles[i+1] - angles[i] > Math.PI) ? 1 : 0;

        // この文字列で、円グラフの扇形の描き方を指定する。
        let path = `M${cx},${cy}` +     // 始点は円の中心。
            `L${x1},${y1}` +            // (x1,y1)に直線を描画する。
            `A${r},${r} 0 ${big} 1` +   // 半径rの円弧を描画する。
            `${x2},${y2}` +             // (x2,y2)まで円弧を描く。
            "Z";                        // 円の中心(cx,cy)に戻り、線を閉じる。

        // この扇形用のCSSカラーを計算する。この式は15色にしか対応していない。
        // このため円グラフには15個より多くの扇形を含めないように。
        let color = `hsl(${(i*40)%360},${90-3*i}%,${50+2*i}%)`;

        // <path>要素で扇形を描画する。createElementNS()に注意。
        let slice = document.createElementNS(svg, "path");

        // <path>要素に属性を設定する。
        slice.setAttribute("d", path);           // 扇形にパスを設定する。
        slice.setAttribute("fill", color);       // 扇形の色を設定する。
        slice.setAttribute("stroke", "black");   // 扇形を黒色で縁取りする。
        slice.setAttribute("stroke-width", "1"); // 幅は1 CSSピクセル。
        chart.append(slice);                     // 扇形をchartに追加する。

        // 凡例を表示する小さな矩形を描画する。
        let icon = document.createElementNS(svg, "rect");
        icon.setAttribute("x", lx);              // 矩形の位置を指定する。
        icon.setAttribute("y", ly + 30*i);
        icon.setAttribute("width", 20);          // 矩形の大きさを設定する。
        icon.setAttribute("height", 20);
        icon.setAttribute("fill", color);        // 扇形と同じ色で塗りつぶす。
        icon.setAttribute("stroke", "black");    // 縁取りの色も同じにする。
        icon.setAttribute("stroke-width", "1");
        chart.append(icon);                      // chartに追加する。

        // 矩形の右にラベルを追加する。
        let label = document.createElementNS(svg, "text");
        label.setAttribute("x", lx + 30);        // テキストの位置。
        label.setAttribute("y", ly + 30*i + 16);
        label.append(`${labels[i]} ${value}`);   // ラベルにテキストを追加する。
        chart.append(label);                     // ラベルをchartに追加する。
    });

    return chart;
}

document.querySelector("#chart").append(pieChart({
    width: 640, height:400,       // 円グラフ全体の大きさ。
    cx: 200, cy: 200, r: 180,     // 円グラフの中心の座標と半径。
    lx: 400, ly: 10,              // 凡例の位置。
    data: {                       // 円グラフ用のデータ。
      "JavaScript": 71.5,
      "Java": 45.4,
      "Bash/Shell": 40.4,
      "Python": 37.9,
      "C#": 35.3,
      "PHP": 31.4,
      "C++": 24.6,
      "C": 22.1,
      "TypeScript": 18.3,
      "Ruby": 10.3,
      "Swift": 8.3,
      "Objective-C": 7.3,
      "Go": 7.2,
    }
  }));