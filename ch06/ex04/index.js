/**
 * `prop`が引数の属性の場合のオブジェクトを生成します。
 * @param {string} prop プロパティ名
 * @param {boolean} writable 
 * @param {boolean} enumerable 
 * @param {boolean} configurable 
 * @returns {object} `prop`プロパティが引数の属性の場合のオブジェクト
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
  result.isOwnProperty = Object.prototype.hasOwnProperty.call(createObj(prop), prop);
  result.isEnumerable = Object.prototype.propertyIsEnumerable.call(createObj(prop), prop);
  return result;
}

console.log('prop is unwritable', testObj((prop)=>createObj(prop, false, true, true)))
console.log('prop is nonenumerable', testObj((prop)=>createObj(prop, true, false, true)))
console.log('prop is nonconfigurable', testObj((prop)=>createObj(prop, true, true, false)))



