
/**
 * 配列aと配列bの同値判定をおこなう。
 * @param {Array} a 
 * @param {Array} b 
 * @returns 配列aと配列bの同値の場合はtrue
 */
export function equalArrays(a, b) {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}