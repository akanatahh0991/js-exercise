import { fib } from "./index.js";

describe("fib", () => {
  it("fibonacci sequence of 5 is 5", () => {
    expect(fib(5)).toBe(5);
  });
  it("fibonacci sequence of 50 is 12586269025", () => {
    expect(fib(50)).toBe(12586269025);
  });
  it("fibonacci sequence of decimal value is null", () => {
    expect(fib(5.5)).toBe(null);
  });
  it("fibonacci sequence of negative value is null", () => {
    expect(fib(-10)).toBe(null);
  });
  it("fibonacci sequence of 0 is 0", () => {
    expect(fib(0)).toBe(0);
  });
  it("fibonacci sequence of 1 is 1", () => {
    expect(fib(1)).toBe(1);
  });
});
