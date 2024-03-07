
/**
 * 配列の要素の合計を計算します。
 * @param {number[]} array
 * @returns {number} 配列の要素の合計
 */
export function sum(array) {
  // 初期値を0にしないとempty arrayの場合にTypeErrorがthrowされる。
  return array?.reduce((accumulator, value) => accumulator + value, 0) ?? 0;
}

/**
 * 配列の要素を結合する。
 * @param {any[]} array 
 * @param {string} separator 区切りに使用する文字列。指定しない場合は","になる。
 */
export function join(array, separator) {
  if (array.length === 0) {
    return "";
  }
  if (separator === undefined) {
    separator = ","
  }
  return array.reduce((accumulator, value) => {
    return `${accumulator}${separator}${value ?? ""}`;
  });
}

/**
 * 配列を逆順にします。
 * @param {any[]} array
 * @returns {any[]} 逆順にされた配列
 */
export function reverse(array) {
  const arrayLength = array.length;
  if (arrayLength === 0) {
    return array;
  }
  array.reduce((_, value, index, original) => {
    if (index <= arrayLength / 2 - 1) {
      const reversedValue = original[arrayLength - index - 1]
      original[index] = reversedValue;
      original[arrayLength - index - 1] = value;
    }
  }, 0)
  return array;
}

/**
 * 配列の要素全てが条件を満たす場合にtrueを返します。
 * @param {any[]} array 配列
 * @param {function(any, number, any[]): boolean} predicate 条件
 * @param {any} thisArgs `predicate`を実行するオブジェクト
 * @returns 配列の要素全てが条件を満たす場合にtrue
 */
export function every(array, predicate, thisArgs) {
  const _this = this;
  return array.reduce((result, value, index, original) => {
    return result && predicate.call((thisArgs ?? _this), value, index, original);
  }, true)
}

/**
 * 配列の要素の少なくとも１つが条件を満たす場合にtrueを返します。
 * @param {any[]} array 配列
 * @param {function(any, number, any[]): boolean} predicate 条件
 * @param {any} thisArgs `predicate`を実行するオブジェクト
 * @returns 配列の要素の少なくとも１つが条件を満たす場合にtrue
 */
export function some(array, predicate, thisArgs) {
  const _this = this;
  return array.reduce((result, value, index, original) => {
    return result || predicate.call((thisArgs ?? _this), value, index, original);
  }, false)
}
