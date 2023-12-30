import { equals } from "./index";

describe('equals test', () => {
  const obj1 = {
    x: 1,
    y: 2,
    f: function() {}
  }
  const obj2 = {}
  Object.defineProperty(obj2, "x", {value: 1, enumerable: false})
  it.each([
      [obj1, obj1, true],
      [obj1, {...obj1}, true],
      [obj1, {x: 1, y: 3}, false],
      [obj1, {x: "1", y: 3}, false],
      [obj1, {x: 1, y: 2, f: function() {}}, false],
      [{[Symbol("x")]: 1, y:2}, {[Symbol("x")]: 2, y:2}, true],
      [obj2, {}, true]
  ])("%p eq %p is %p", (obj1, obj2, expectedResult) => {
      expect(equals(obj1, obj2)).toBe(expectedResult)
  })
})

