import { retryWithExponentialBackoff } from "./index.js";
import { jest } from "@jest/globals";

describe("test retryWithExponentialBackoff", () => {
  test("func return true without retry", (done) => {
    const mockFunc = jest.fn().mockReturnValue(true);
    const callback = jest.fn();

    const result = retryWithExponentialBackoff(mockFunc, 5, callback);
    // すぐにundefinedが返されること
    expect(result).toBe(undefined);

    setTimeout(() => {
      expect(mockFunc).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(true);
      done();
    }, 500);
  });
  test("func return true 2rd retry.", (done) => {
    const mockFunc = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValue(true);
    const callback = jest.fn();
    const result = retryWithExponentialBackoff(mockFunc, 2, callback);
    // すぐにundefinedが返されること
    expect(result).toBe(undefined);
    // 3秒より前は結果が返されない
    setTimeout(() => {
        expect(callback).toHaveBeenCalledTimes(0);
    }, 2500);
    // 3秒以降では結果が返されている
    setTimeout(() => {
        expect(mockFunc).toHaveBeenCalledTimes(3);
        expect(callback).toHaveBeenCalledWith(true);
        done();
      }, 3500);
  });
  test("func return true 3rd retry but maxRetry is 2.", (done) => {
    const mockFunc = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValue(true);
    const callback = jest.fn();
    const result = retryWithExponentialBackoff(mockFunc, 2, callback);
    // すぐにundefinedが返されること
    expect(result).toBe(undefined);
    // 3秒より前は結果が返されない
    setTimeout(() => {
        expect(callback).toHaveBeenCalledTimes(0);
    }, 2500);
    // 3秒以降では結果が返されている
    setTimeout(() => {
        expect(mockFunc).toHaveBeenCalledTimes(3);
        expect(callback).toHaveBeenCalledWith(false);
        done();
      }, 3500);
  });
  test("maxRetry is not integer", () => {
    expect(() => retryWithExponentialBackoff(() => true, 4.5, () => {})).toThrow();
  })
  test("maxRetry is negative", () => {
    expect(() => retryWithExponentialBackoff(() => true, -1, () => {})).toThrow();
  })
});
