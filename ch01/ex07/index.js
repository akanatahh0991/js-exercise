/**
 * ２次元座標上の点を表すクラス。
 */
export class Point {
  /**
   * Pointクラスのコンストラクタ
   * @param {number} x x座標の値
   * @param {number} y y座標の値
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  distance() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * pointの座標を加算します。
   * @param {Point} point
   */
  add(point) {
    this.x += point.x;
    this.y += point.y;
  }
}
