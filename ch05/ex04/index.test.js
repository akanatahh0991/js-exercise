import { fibonacci1, fibonacci2, fibonacci3 } from "./index.js";

describe("fibonacci test", () => {
  it("fibonacci1() = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]", () => {
    expect(fibonacci1()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
  it("fibonacci2() = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]", () => {
    expect(fibonacci2()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
  it("fibonacci3() = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]", () => {
    expect(fibonacci3()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
  
});