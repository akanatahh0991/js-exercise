
/**
 * べき乗 ($x^n$) を返す
 * @param {number} x 数値
 * @param {number} n 整数値
 * @returns {number} べき乗 ($x^n$)
 * @throws {TypeError} `n`が不正値の場合にthrowされる。
 */
export const pow = (x, n) => {
  if (!Number.isInteger(n)) {
    throw new TypeError(`invalid arguments n = ${n}`)
  }
  if (n === 0) {
    return 1;
  }
  const absN = Math.abs(n);
  let result = 1;
  let base = x;
  let exponent = absN;
  while(exponent > 1) {
    if (exponent % 2 === 1) {
      result *= base
    }
    exponent = Math.floor(exponent / 2);
    base *= base;
  }
  result *= base
  return n > 0 ? result : 1 / result;
}

console.log(pow(2, -5), 2 ** (-5));
console.log(pow(2, 0), 2 ** 0);
console.log(pow(2, 7), 2 ** 7);
console.log(pow(0, 7), 0 ** 7);
console.log(pow(0, 0), 0 ** 0);
console.log(pow(0, -7), 0 ** (-7));
console.log(5 ** 3.4);