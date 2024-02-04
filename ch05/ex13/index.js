
/**
 * 初項と第2項が1のフィボナッチ数列の値を生成するジェネレータ関数。
 */
export function* fibonacciGenIterator() {
  const arry = [1, 1];
  yield arry[0];
  yield arry[1];
  let i = 2;
  while (true) {
    arry[i] = arry[i - 1] + arry[i - 2];
    yield arry[i]
    i++
  }
}