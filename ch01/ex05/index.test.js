import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  // 以下に sum, factorial のテストを記載せよ
  describe("sum", () => {
    it("returns total value of array elements which are all positive integer", () => {
      expect(sum([4, 7, 12])).toBe(23);
    });
    it("returns zero when empty array", () => {
      expect(sum([])).toBe(0);
    });
    it("returns total value of array elements which contains negative integer", () => {
      expect(sum([-2, 5, 7, -12])).toBe(-2);
    });
  });

  describe("factorial", () => {
    it("returns factorial value when positive integer ", () => {
      expect(factorial(5)).toBe(120);
    });
    it("returns 1 when value is zero", () => {
      expect(factorial(0)).toBe(1);
    });
    it("returns null when value is negative", () => {
      expect(factorial(-1)).toBe(null);
    });
    it("returns null when value is not integer", () => {
      expect(factorial(4.2)).toBe(null);
    });
    it("returns 1 when value is integer", () => {
      expect(factorial(1.0)).toBe(1);
    });
  });
});
