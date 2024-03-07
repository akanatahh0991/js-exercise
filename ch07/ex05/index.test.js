import {pop, push, shift, unshift, sort} from './index.js';

describe("pop test", () => {
  it.each([
    [[]],
    [[1, 2, 3, 4]]
  ])("pop(%p) test", (array) => {
    const popResult = [...array];
    popResult.pop();
    const result = [...array];
    expect(pop(array)).toStrictEqual(popResult);
    expect(array).toStrictEqual(result);
  })
})

describe("push test", () => {
  it.each([
    [[], 7],
    [[1, 2], 8, "test", ["k"]]
  ])("push(%p) test", (array, ...element) => {
    const pushResult = [...array];
    pushResult.push(...element);
    const result = [...array];
    expect(push(array, ...element)).toStrictEqual(pushResult);
    expect(array).toStrictEqual(result);
  })
})

describe("shift test", () => {
  it.each([
    [[]],
    [[1, 2, 3, 4]]
  ])("shift(%p) test", (array) => {
    const shiftResult = [...array];
    shiftResult.shift();
    const result = [...array];
    expect(shift(array)).toStrictEqual(shiftResult);
    expect(array).toStrictEqual(result);
  })
})

describe("unshift test", () => {
  it.each([
    [[], 7],
    [[1, 2], 8, "test", ["k"]]
  ])("unshift(%p) test", (array, ...element) => {
    const unshiftResult = [...array];
    unshiftResult.unshift(...element);
    const result = [...array];
    expect(unshift(array, ...element)).toStrictEqual(unshiftResult);
    expect(array).toStrictEqual(result);
  })
})

describe("sort test", () => {
  it.each([
    [[]],
    [[1]],
    [[3, 2, 1, 4, 5]],
    [[11, -15, 8, 0, 8]]
  ])("sort(%p) test", (array) => {
    const accendingSort = (a, b) => b - a;
    const decendingSort = (a, b) => a - b;
    const result = [...array];
    expect(sort(array, accendingSort)).toStrictEqual([...array].sort(accendingSort));
    expect(sort(array, decendingSort)).toStrictEqual([...array].sort(decendingSort));
    expect(array).toStrictEqual(result);
  })
})

