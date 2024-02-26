
/**
 * `obj`から独自プロパティと列挙可能な継承プロパティ名の配列を取得する。
 * @param {object} obj 任意のオブジェクト
 * @returns {Array} 独自プロパティと列挙可能な継承プロパティ名の配列
 */
export function getOwnAndEnumerableParentPropetyNames(obj) {
  if (obj === null || obj === undefined) {
    return [];
  }
  const result = [];

  // Symbol以外の独自プロパティ
  Object.getOwnPropertyNames(obj).forEach((p) => {
    result.push(p);
  })
  // Symbolの独自プロパティ
  Object.getOwnPropertySymbols(obj).forEach((p) => {
    result.push(p);
  })

  // 列挙可能な継承プロパティ
  for (const prop in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
      result.push(prop);
    }
  }
  return result;
}

console.log(getOwnAndEnumerableParentPropetyNames({}))