/**
 * 絶対値を返します。
 * @param {number} x 値
 * @returns {number} xの絶対値
 */
export function abs(x) {
  if (x >= 0) {
    return x;
  } else {
    return -x;
  }
}

/**
 * 配列の要素の合計を返します。
 * @param {number[]} array 配列
 * @returns {number} 配列の要素の合計
 */
export function sum(array) {
  const elements = [...array];
  let sum = 0;
  for (let x of elements) {
    sum += x;
  }
  return sum;
}

/**
 * nの階乗を返します。
 * nが非整数値である場合、負の値である場合はnullを返します。
 * @param {number} n 正の整数値
 * @returns {number} nの階乗。ただし、nが非整数値である場合、負の値である場合はnull。
 */
export function factorial(n) {
  if (!Number.isInteger(n) || n < 0) {
    return null;
  }
  let product = 1;
  while (n > 1) {
    product *= n;
    n--;
  }
  return product;
}
