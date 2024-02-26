import { getOwnAndEnumerableParentPropetyNames } from "./index.js";
/**
 * テスト用オブジェクトと`getOwnAndEnumerableParentPropetyNames`の期待結果のオブジェクトを生成します。
 * - プロパティ名がstringの場合 - プロパティの値にはプロパティ名と同じ文字列が格納されます。
 * - プロパティ名がSymbolの場合 - プロパティの値にはプロパティ名のSymbolのdescriptionが格納されます。
 * @param {string[]} ownEnumerableProps 独自の列挙可能なプロパティ
 * @param {string[]} ownNonEnumerableProps 独自の列挙不可なプロパティ
 * @param {symbol[]} ownSymbolProps 独自のSymbolのプロパティ
 * @param {string[]} parentEnumerableProps 継承した列挙可能なプロパティ
 * @param {string[]} parentNonEnumerableProps 継承した列挙不可なプロパティ
 * @param {symbol[]} parentSymbolProps 継承したSymbolのプロパティ
 * @returns {object} objプロパティにテスト対象のオブジェクト、expectedプロパティにテスト結果のプロパティ名の配列を格納した配列
 */
function createTestCase(
  ownEnumerableProps,
  ownNonEnumerableProps,
  ownSymbolProps,
  parentEnumerableProps,
  parentNonEnumerableProps,
  parentSymbolProps
) {
  const expected = [];
  const parentObj = {};
  parentEnumerableProps.forEach((p) => {
    parentObj[p] = p;
    expected.push(p);
  });
  parentNonEnumerableProps.forEach((p) => {
    Object.defineProperty(parentObj, p, {
      value: p,
      enumerable: false,
      writable: true,
      configurable: true
    });
  });
  parentSymbolProps.forEach((p) => {
    parentObj[p] = p.description;
  });
  const obj = Object.create(parentObj);
  ownEnumerableProps.forEach((p) => {
    obj[p] = p;
    expected.push(p);
  });
  ownNonEnumerableProps.forEach((p) => {
    Object.defineProperty(obj, p, {
      value: p,
      enumerable: false,
      writable: true,
      configurable: true
    });
    expected.push(p);
  });
  ownSymbolProps.forEach((p) => {
    obj[p] = p.description;
    expected.push(p);
  });
  return {
    obj, 
    objProperyNames: [...ownEnumerableProps, ...ownNonEnumerableProps, ...ownSymbolProps, ...parentEnumerableProps, ...parentNonEnumerableProps, ...parentSymbolProps],
    expected}
}

test.each([
  {obj: {}, objProperyNames: "{}",expected: []},
  {obj: null, objProperyNames: "null", expected: []},
  {obj: undefined, objProperyNames: "undefined", expected: []},
  createTestCase(
    ["apple"], 
    ["banana"], 
    [Symbol("orange")],
    ["parent-apple"], 
    ["parent-banana"], 
    [Symbol("parent-orange")]
  ),
  createTestCase(
    ["apple"], 
    ["banana"], 
    [Symbol("orange")],
    ["apple"], 
    ["parent-banana"], 
    [Symbol("parent-orange")]
  ),
  createTestCase(
    ["apple", "melon"], 
    ["banana", "mikan"], 
    [Symbol("orange"), Symbol("water-melon")],
    ["parent-apple", "parent-melon"], 
    ["parent-banana"], 
    [Symbol("parent-orange")]
  )
])("getOwnAndEnumerableParentPropetyNames($objProperyNames) => $expected", ({obj: testObj, expected: result}) => {
  expect(new Set(getOwnAndEnumerableParentPropetyNames(testObj))).toEqual(new Set(result))
});