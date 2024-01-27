
/**
 * aとbの差を算出する。
 * @param {number} a 自然数
 * @param {number} b 自然数
 * @returns aとbの差
 */
export function sub(a, b) {

  function add(x, y) {
    while(y) {
      const carry = x & y;
      x = x ^ y;
      y = carry << 1
    }
    return x
  }
  const aAsBit = a >>> 0;
  const bAsBit = b >>> 0;

  const bAsBitComplement = ~bAsBit + 1
  return add(aAsBit, bAsBitComplement)
}