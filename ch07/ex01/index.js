/**
 * ２つの行列を加算します。
 * @param {number[][]} matrix1 行列1
 * @param {number[][]} matrix2 行列2
 * @returns {number[][]} `matrix1`と`matrix2`の和
 * @throws {TypeError} ２つの行列の行数と列数が一致しない場合は`TypeError`がthrowされる。
 */
export function addMatrix(matrix1, matrix2) {
  if (
    !isMatrix(matrix1) ||
    !isMatrix(matrix2) ||
    matrix1.length !== matrix2.length ||
    matrix1[0].length !== matrix2[0].length
  ) {
    throw TypeError(`invalid argument: matrix1=${matrix1}, matrix2=${matrix2}`);
  }
  const rowLength = matrix1.length;
  const columnLength = matrix1[0].length;
  const result = new Array(rowLength);
  for (let i = 0; i < rowLength; i++) {
    result[i] = new Array(columnLength);
  }

  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < columnLength; j++) {
      result[i][j] = matrix1[i][j] + matrix2[i][j];
    }
  }
  return result;
}

/**
 * ２つの行列の乗算を行います。
 * @param {number[][]} matrix1 行列1
 * @param {number[][]} matrix2 行列2
 * @returns {number[][]} `matrix1`と`matrix2`の積
 * @throws {TypeError} `matrix1`の列数と`matrix2`の行数が一致しない場合にthrowされる。
 */
export function multiplyMatrix(matrix1, matrix2) {
  if (
    !isMatrix(matrix1) ||
    !isMatrix(matrix2) ||
    matrix1[0].length !== matrix2.length
  ) {
    throw TypeError(`invalid argument: matrix1=${matrix1}, matrix2=${matrix2}`)
  }

  const rowLength = matrix1.length;
  const columnLength = matrix2[0].length;
  const result = new Array(rowLength);
  for (let i = 0; i < rowLength; i++) {
    result[i] = new Array(columnLength);
  }

  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < columnLength; j++) {
      let dotVector = 0;
      for (let k = 0; k < matrix1[0].length; k++) {
        dotVector += matrix1[i][k] * matrix2[k][j]
      }
      result[i][j] = dotVector
    }
  }
  return result;
}

/**
 * ２次元配列が行列の形式になっているかどうか判定する。
 * @param {number[][]} twoDimensionalArray ２次元配列
 * @returns {boolean} `twoDimensionalArray`が行列の形式になっているか
 */
function isMatrix(twoDimensionalArray) {
  const columnLength = twoDimensionalArray[0].length;
  for (let i = 0; i < twoDimensionalArray.length; i++) {
    if (twoDimensionalArray[i].length !== columnLength) {
      return false;
    }
    for (let j = 0; j < columnLength; j++) {
      const element = twoDimensionalArray[i][j];
      if (typeof element !== "number" || Number.isNaN(element)) {
        return false;
      }
    }
  }
  return true;
}
