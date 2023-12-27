import {equal} from "./index.js"

describe("equal", () => {
  it("(0.3 - 0.2, 0.1) is true", () => {
    expect(true).toBe(equal(0.3 - 0.2, 0.1));
  });
  it("(0.2 - 0.1, 0.1) is true", () => {
    expect(true).toBe(equal(0.2 - 0.1, 0.1));
  });
  it("(0.2 - 0.1, 0.0999999999) is false", () => {
    expect(false).toBe(equal(0.2 - 0.1, 0.0999999999));
  });
  it("(0.2 - 0.1, 0.09999999991) is true", () => {
    expect(true).toBe(equal(0.2 - 0.1, 0.09999999991));
  });
  it("(0.1 - 0.2, -0.0999999999) is false", () => {
    expect(false).toBe(equal(0.1 - 0.2, -0.0999999999));
  });
  it("(0.1 - 0.2, -0.09999999991) is true", () => {
    expect(true).toBe(equal(0.1 - 0.2, -0.09999999991));
  });
  it("(NaN, 0) is false", () => {
    expect(false).toBe(equal(NaN, 0));
  });
  it("(0, NaN) is false", () => {
    expect(false).toBe(equal(0, NaN));
  });
  it("(Infinity, 0) is false", () => {
    expect(false).toBe(equal(Infinity, 0));
  });
  it("(0, Infinity) is false", () => {
    expect(false).toBe(equal(0, Infinity));
  });
  it("(-Infinity, 0) is false", () => {
    expect(false).toBe(equal(-Infinity, 0));
  });
  it("(0, -Infinity) is false", () => {
    expect(false).toBe(equal(0, -Infinity));
  });
});