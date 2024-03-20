
/**
 * 自然数nと英数文字cを引数にとり、文字cをn回コンソール出力してから文字cをn個含む配列を返す。
 * @param {number} n 自然数
 * @param {string} c 英数文字
 * @returns {array} 文字cをn個含む配列
 * @throws {TypeError} `n`や`c`に不正値が代入された場合はthrowされる。
 * 
 * 引数の括弧は必須（２個以上のため）
 * 戻り値の括弧は不要（オブジェクトリテラルではないため）
 */
export const repeat = (n, c) => {
  if (!Number.isInteger(n) || n <= 0) {
    throw new TypeError(`invalid argument n=${n}`)
  }
  if (c.match(/^[0-9a-zA-Z]$/) === null) {
    throw new TypeError(`invalid argument c=${c}`)
  }

  const arry = new Array(n).fill(c);
  arry.forEach((value) => console.log(value));
  return arry;
}

/**
 * 数値xを引数にとり、xの二乗の数値を返す
 * @param {number} x 数値
 * @returns {number} `x`の２乗の数値
 * 
 * 引数の括弧は不要（引数１個のため）
 * 戻り値の括弧は不要（オブジェクトリテラルではないため）
 */
export const square = x => x ** 2;

// TODO nowの仕様を確認する
/**
 * 現在時刻のプロパティnowを含むオブジェクトを返す
 * @returns {obj} 現在時刻のプロパティnowを含むオブジェクト
 * 
 * 引数の括弧は必須（引数0個のため）
 * 戻り値の括弧は必須（オブジェクトリテラルのため）
 */
export const getDateTimeNow = () => ({now: Date.now()});
