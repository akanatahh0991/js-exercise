import {sub} from "./index.js";

describe("sub", () => {
  it("sub(8, 5) => 3", () => {
    expect(sub(8, 5)).toBe(3);
  });
  it("sub(8, -5) => 13", () => {
    expect(sub(8, 5)).toBe(3);
  });
});