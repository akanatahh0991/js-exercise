import {equal} from "./index.js"

describe("equal", () => {
  it("(0.3 - 0.2, 0.1) is true", () => {
    expect(equal(0.3 - 0.2, 0.1)).toBe(true);
  });
  it("(0.2 - 0.1, 0.1) is true", () => {
    expect(equal(0.2 - 0.1, 0.1)).toBe(true);
  });
  it("(0.2 - 0.1, 0.0999999999) is false", () => {
    expect(equal(0.2 - 0.1, 0.0999999999)).toBe(false);
  });
  it("(0.2 - 0.1, 0.09999999991) is true", () => {
    expect(equal(0.2 - 0.1, 0.09999999991)).toBe(true);
  });
  it("(0.1 - 0.2, -0.0999999999) is false", () => {
    expect(equal(0.1 - 0.2, -0.0999999999)).toBe(false);
  });
  it("(0.1 - 0.2, -0.09999999991) is true", () => {
    expect(equal(0.1 - 0.2, -0.09999999991)).toBe(true);
  });
  it("(NaN, 0) is false", () => {
    expect(equal(NaN, 0)).toBe(false);
  });
  it("(0, NaN) is false", () => {
    expect(equal(0, NaN)).toBe(false);
  });
  it("(Infinity, 0) is false", () => {
    expect(equal(Infinity, 0)).toBe(false);
  });
  it("(0, Infinity) is false", () => {
    expect(equal(0, Infinity)).toBe(false);
  });
  it("(-Infinity, 0) is false", () => {
    expect(equal(-Infinity, 0)).toBe(false);
  });
  it("(0, -Infinity) is false", () => {
    expect(equal(0, -Infinity)).toBe(false);
  });
});