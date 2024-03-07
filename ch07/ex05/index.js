
/**
 * `array`の最後の要素を取り除いた配列を返します。
 * @param {any} array 配列
 * @returns {any[]} `array`の最後の要素を取り除いた配列
 */
export function pop(array) {
  return array.slice(0, -1);
}

/**
 * `array`の最後に`element`を追加した配列を返します。
 * @param {any[]} array 
 * @param  {...any} element 
 * @returns {any[]} `array`の最後に`element`を追加した配列
 */
export function push(array, ...element) {
  return [...array, ...element];
}

/**
 * `array`の先頭要素を削除した配列を返します。
 * @param {any[]} array 
 * @returns {any[]} `array`の先頭要素を削除した配列
 */
export function shift(array) {
  return array.slice(1)
}

/**
 * `array`の先頭要素に`element`を追加した配列を返します。
 * @param {any[]} array 
 * @param  {...any} element 
 * @returns {any[]} `array`の先頭要素に`element`を追加した配列
 */
export function unshift(array, ...element) {
  return [...element, ...array];
}

/**
 * `array`を`cmpareFn`で比較してソートした配列を返します。
 * @param {any[]} array 
 * @param {function(any, any): number} compareFn 
 * @returns `array`を`cmpareFn`で比較してソートした配列
 */
export function sort(array, compareFn) {
  // そもそもtoSorttedという関数があるからそれを使えばよい。
  return [...array].sort(compareFn)
}