import { DynamicSizeArray } from "./index.js";

describe("DynamicSizeArray test", () => {
  it("initial size test", () => {
    const array = new DynamicSizeArray();
    array.set(0, 1);
    expect(array.length()).toBe(1)
    array.set(2, [4, 5]);
    expect(array.length()).toBe(3)
    expect(array.get(0)).toBe(1);
    expect(array.get(1)).toBe(undefined);
    array.push("text");
    expect(array.length()).toBe(4);
    expect(array.get(3)).toBe("text");
  });

  it("expand size by push test", () => {
    const array = new DynamicSizeArray();
    for(let i = 0; i < 5; i++) {
      array.push(i)
    }
    expect(array.length()).toBe(5);
    expect(array.get(4)).toBe(4);
    for(let i = 5; i < 33; i++) {
      array.push(i)
    }
    expect(array.length()).toBe(33);
    expect(array.get(32)).toBe(32);
  });

  it("expand size by set test", () => {
    const array = new DynamicSizeArray();
    array.set(4, 4);
    expect(array.length()).toBe(5);
    expect(array.get(4)).toBe(4);
    array.set(32, 32);
    expect(array.length()).toBe(33);
    expect(array.get(32)).toBe(32);
  });
})