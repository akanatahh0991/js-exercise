import { assign } from "./index.js";

/**
 * `target`プロパティと`sources`プロパティを持つテストケースのオブジェクトを作成します。
 * @param {object} target コピー先のオブジェクト
 * @param  {...any} sources コピー元のオブジェクト
 * @returns {object} `target`プロパティと`sources`プロパティを持つテストケースのオブジェクト
 */
function createTestCase(target, ...sources) {
  return { target, sources}
}

/**
 * テスト用オブジェクトを生成します。
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
function createTestObj(
  ownEnumerableProps,
  ownNonEnumerableProps,
  ownSymbolProps,
  parentEnumerableProps,
  parentNonEnumerableProps,
  parentSymbolProps
) {
  const parentObj = {};
  parentEnumerableProps.forEach((p) => {
    parentObj[p] = p;
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
  });
  ownNonEnumerableProps.forEach((p) => {
    Object.defineProperty(obj, p, {
      value: p,
      enumerable: false,
      writable: true,
      configurable: true
    });
  });
  ownSymbolProps.forEach((p) => {
    obj[p] = p.description;
  });
  return obj;
}

describe("normal senario", () => {
  it.each([
    createTestCase({a: "a"}, {b: "b"}),
    createTestCase({a: "a"}, null),
    createTestCase({a: "a"}, undefined),
    createTestCase({a: "a"}, 1),
    createTestCase({a: "a"}, true),
    createTestCase({a: "a"}, Symbol("test")),
    createTestCase({a: "a"}, 9007199254740991n),
    createTestCase({a: "a"}, {a: "A"},  {a: "B"}),
    createTestCase({a: "a", printA() {}}, { b: "b", printB(){}}),
    createTestCase(
      {},
      createTestObj(["a"], ["b"], ["c"], [], [], []) 
    ),
    createTestCase(
      {},
      createTestCase(["a"], [], [], ["c"], ["d"], ["e"])
    ),
  ])("test assign($target, $sources)", ({target, sources}) => {
    expect(assign(target, sources)).toStrictEqual(Object.assign(target, sources));
  })
});

describe("abnormal senario", () => {
  it.each(
    [
      [null, {}],
      [undefined, {}]
    ]
  )("test assign(%p, %p)", (target, sources) => {
    expect(() => {assign(target, sources)}).toThrow()
  });
  it("obj having getter setter", () => {
    const target = {};
    const source = { 
      _serial: 1, 
      get serial() { return this._serial++;}, 
      set serial(value) { 
        if (value < this._serial) {
          throw TypeError(`value is less than ${this._serial}`)
        }
        this._serial = value;
      }
    };
    expect(assign(target, source)).toStrictEqual(Object.assign(target, source))
      
  })
})



