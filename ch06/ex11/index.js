
/**
 * 極座標`r`(0以上)と`theta`(-`PI`から`PI`をとる)をプロパティに持つオブジェクト。
 */
export const point = {
  r: 0,
  theta: 0,
  get x() {
    return this.r * Math.cos(this.theta);
  },
  set x(value) {
    if (Number.isNaN(value)) {
      throw TypeError("set NAN to x")
    }
    const yValue = this.y;
    this.r = Math.sqrt(value ** 2 + yValue ** 2);
    // -PIからPIまでの値となる
    this.theta = Math.atan2(yValue, value)
  },
  get y() {
    return this.r * Math.sin(this.theta)
  },
  set y(value) {
    if (Number.isNaN(value)) {
      throw TypeError("set NAN to y")
    }
    const xValue = this.x;
    this.r = Math.sqrt(xValue ** 2 + value ** 2);
    this.theta = Math.atan2(value, xValue);
  }
}