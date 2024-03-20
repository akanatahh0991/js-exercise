import {repeat, square, getDateTimeNow} from './index.js';
import {expect, jest, test} from '@jest/globals';

describe("repeat test", () => {

  let consoleSpy;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log');
  });
  
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("normal test repeat(4, '9')", () => {
    expect(repeat(4, "9")).toStrictEqual(["9", "9", "9","9"]);
    expect(consoleSpy).toHaveBeenCalledTimes(4);
    expect(consoleSpy).toHaveBeenCalledWith("9")
  });
  it("normal test repeat(3, 'a')", () => {
    expect(repeat(3, "a")).toStrictEqual(["a", "a","a"]);
    expect(consoleSpy).toHaveBeenCalledTimes(3);
    expect(consoleSpy).toHaveBeenCalledWith("a")
  });
  it("normal test repeat(1, 'W')", () => {
    expect(repeat(1, "W")).toStrictEqual(["W"]);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith("W")
  });
  it("abnormal test repeat(0, '9')", () => {
    expect(() => repeat(0, '9')).toThrow();
  });
  it("abnormal test repeat(-1, '9')", () => {
    expect(() => repeat(-1, '9')).toThrow();
  });
  it("abnormal test repeat(4.5, '9')", () => {
    expect(() => repeat(4.5, '9')).toThrow();
  });
  it("abnormal test repeat(4, 'AB')", () => {
    expect(() => repeat(4, 'AB')).toThrow();
  });
  it("abnormal test repeat(4, 'あ')", () => {
    expect(() => repeat(4, 'AB')).toThrow();
  });
  it("abnormal test repeat(4, '10')", () => {
    expect(() => repeat(4, 'AB')).toThrow();
  });
});

describe("square test", () => {
  it("normal test square(4)", ()=> {
    expect(square(4)).toBe(16);
  });
  it("normal test square(2.5)", ()=> {
    expect(square(2.5)).toBe(6.25);
  });
})