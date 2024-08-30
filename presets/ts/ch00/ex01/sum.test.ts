import { sum } from "./sum.ts";

describe("sum", () => {
  it("二つの正の数が与えられるとその合計を返す", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
