import { filterByEvenValue } from "./index.js";

describe("filterByEvenValue", () => {
  it("object has even and odd value propety", () => {
    expect(filterByEvenValue({a: 7, b: 9, z: 4})).toEqual({z:4});
  });

  it("empty object", () => {
    expect(filterByEvenValue({})).toEqual({});
  });

  it("object has only even value propety", () => {
    expect(filterByEvenValue({a: 4, b: 6, c: 8})).toEqual({a: 4, b: 6, c: 8});
  });

  it("object has only odd value propety", () => {
    expect(filterByEvenValue({a: 5, b: 7, c: 9})).toEqual({});
  });

  it("object has non-number value property", () => {
    expect(() => filterByEvenValue({a: "test", b: 8, c: 7})).toThrow(RangeError);
  });

  it("object has double value property", () => {
    expect(() => filterByEvenValue({a: 4.3, b: 8, c: 7})).toThrow(RangeError);
  });
});