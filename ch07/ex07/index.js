/**
 * `array`を`compare`に従いソートする。
 * @param {any[]} array 配列
 * @param {function(a, b) => number} compare aがbよりも大きい場合は+1, 小さい場合は-1、同じ場合は0を返すこと。
 * @returns {any[]} ソート済の配列
 */
export function sort(
  array,
  compare = (lhs, rhs) => (lhs < rhs ? -1: lhs > rhs ? +1 :0)
) {
  // バブルソート
  for (let i = 1; i < array.length; i++) {
    for(let j = 0; j < array.length - i; j++) {
      if (compare(array[j], array[j + 1]) > 0) {
        const temp = array[j];
        array [j] = array[j + 1];
        array [j + 1] = temp; 
      }
    }
  }
  return array;
}

console.log(sort([11, 10, 11, 10, 2]))
console.log([11, 10, 11, 10, 2].sort())