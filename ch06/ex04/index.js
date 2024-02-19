/**
 * `prop`が引数の属性の場合のオブジェクトを生成します。
 * @param {string} prop プロパティ名
 * @param {boolean} writable 
 * @param {boolean} enumerable 
 * @param {boolean} configurable 
 * @returns `prop`プロパティが引数の属性の場合のオブジェクト
 */
function createObj(
  prop,
  writable,
  enumerable,
  configurable,
) {
  const obj = {};
  Object.defineProperty(obj, prop, {
    value: 'original',
    writable,
    enumerable,
    configurable,
  });
  return obj;
}

function testObj(createObj) {
  const prop = 'prop';
  const result = {}
  try {
    createObj(prop)[prop] = 'changed'
    result.changeable = true
  } catch (e) {
    result.changeable = false
  }
  try {
    delete createObj(prop)[prop]
    result.deletable = true
  } catch (e) {
    result.deletable = false
  }
  result.isOwnProperty = createObj(prop).hasOwnProperty(prop);
  result.isEnumerable = createObj(prop).propertyIsEnumerable(prop);
  return result;
}

console.log('prop is unwritable', testObj((prop)=>createObj(prop, false, true, true)))
console.log('prop is nonenumerable', testObj((prop)=>createObj(prop, true, false, true)))
console.log('prop is nonconfigurable', testObj((prop)=>createObj(prop, true, true, false)))



