/**
 * 与えられた整数値を32ビット整数表現形式で表現した場合に1であるビットの数を返す。
 * @param {number} a 整数値
 * @returns aを32ビット整数表現形式で表現した場合に1であるビットの数
 */
export function bitCount(a) {
  if (!Number.isInteger(a)) {
    throw new RangeError("param is not integer: " + a)
  }
  // |だと負の値に耐えられない
  let aAsBit = a >>> 0
  let count = 0;
  while (aAsBit) {
    if (aAsBit & 1) {
      count++
    }
    aAsBit = aAsBit >>> 1
  }
  return count
}