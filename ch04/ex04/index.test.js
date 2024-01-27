import {bitCount} from "./index.js";

describe("bitCount", () => {
  it("bitCount(0b111) is 3", () => {
    expect(bitCount(0b111)).toBe(3);
  });
  it("bitCount(0b1111111111111111111111111111111) is 31", () => {
    expect(bitCount(0b1111111111111111111111111111111)).toBe(31);
  });
  it("bitCount(15) is 4", () => {
    expect(bitCount(15)).toBe(4);
  });
  it("bitCount(-1) is 31", () => {
    expect(bitCount(-1)).toBe(32);
  });
});