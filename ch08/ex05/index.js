
/**
 * 奇数番に string の値を受け取り偶数番に任意の値を受け取り、各偶数奇数のペアで `{奇数番の値: 偶数番の値}`の形式になるオブジェクトを返却する。
 * 例えば`sequenceToObject("a", 1, "b", 2)`は`{a: 1, b: 2}`を返却する。
 * 奇数番に指定するstringに重複がある場合は、後から指定されたペアの偶数の値で上書きする。
 * いずれかの奇数番の値が string でない場合、または値の個数の合計が偶数ではない場合は例外を発生させる
 * @param  {...any} values 奇数番の値はstring, 偶数番の値は任意。
 * @returns {object} `{奇数番の値: 偶数番の値}`の形式になるオブジェクト
 * @throws {TypeError} `values`の奇数番に`string`ではない値がある場合、`values`が奇数個の場合にthrowされる。
 */
export function sequenceToObject(...values) {
  if (values.length % 2 === 1) {
    throw new TypeError("values length must be even");
  }

  const result = {}
  for(let i = 0; i < values.length; i += 2) {
    const key = values[i];
    if (typeof key !== 'string') {
      throw new TypeError("even value must be string")
    }
    result[key] = values[i + 1]
  }
  return result;
}