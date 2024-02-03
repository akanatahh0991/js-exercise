
/**
 * 値が整数値のプロパティからなるオブジェクトから値が偶数のプロパティからなるオブジェクトを返す。
 * @param {object} obj 
 * @returns 値が偶数のプロパティからなるオブジェクト
 * @throws {RangeError} オブジェクトのプロパティに整数値ではない数値が書くのれていた場合にthrowされる。
 */
export function filterByEvenValue(obj) {
  const evenValueObj = {};
  for(const [k, v] of Object.entries(obj)) {
    if (!Number.isInteger(v)) {
      throw new RangeError("invalid object property: " + JSON.stringify(obj));
    }
    if (v % 2 === 0) {
      evenValueObj[k] = v;
    }
  }
  return evenValueObj;
}