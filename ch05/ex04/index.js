/**
 * 初項と第2項が1のフィボナッチ数列の最初の10個を配列で返す。
 * @returns 初項と第2項が1のフィボナッチ数列の最初の10個を配列
 */
export function fibonacci1() {
  const arry = [1, 1];
  let i = 2;
  while (i < 10) {
    arry[i] = arry[i - 1] + arry[i - 2];
    i++;
  }
  return arry;
}

/**
 * 初項と第2項が1のフィボナッチ数列の最初の10個を配列で返す。
 * @returns 初項と第2項が1のフィボナッチ数列の最初の10個を配列
 */
export function fibonacci2() {
  const arry = [1, 1];
  let i = 2;
  do {
    arry[i] = arry[i - 1] + arry[i - 2];
  } while (++i < 10);
  return arry;
}

/**
 * 初項と第2項が1のフィボナッチ数列の最初の10個を配列で返す。
 * @returns 初項と第2項が1のフィボナッチ数列の最初の10個を配列
 */
export function fibonacci3() {
  const arry = [1, 1];
  for (let i = 2; i < 10; i++) {
    arry[i] = arry[i - 1] + arry[i - 2];
  }
  return arry;
}
