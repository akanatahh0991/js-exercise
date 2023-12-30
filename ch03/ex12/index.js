const obj1 = {
  x: 1
};

obj1.y = 2;

const obj2 = {
  x: 1,
  y: 2
};

console.log(obj1 === obj2); //false

/**
 * 引数で与えられた２つのオブジェクトの同値性を判定します。
 * ただし、以下を制約とします。
 * - 列挙不可能なプロパティは比較しません。
 * - Symbolで定義されたプロパティは比較しません。
 * - プロパティがオブジェクトの場合、インスタンスが一致する場合のみ同値と判定します。
 * @param {object} obj1 
 * @param {object} obj2 
 * @returns 引数で与えられた２つのオブジェクトの同値の場合はtrue
 */
export function equals(obj1, obj2) {
  if (typeof obj1 !== "object" || typeof obj2 !== "object") return false
  if (obj1 === obj2) return true;
  if (obj1 === null || obj2 === null) return false;
  
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  for(const k1 in obj1) {
    if (obj1[k1] !== obj2[k1]) {
      return false
    }
  }
  return true;
}
