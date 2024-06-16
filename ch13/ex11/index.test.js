import { retryWithExponentialBackoff } from "./index.js";
import { jest } from "@jest/globals";

describe("test retryWithExponentialBackoff", () => {
  test("func is success without retry", async () => {
    const mockFunc = jest.fn().mockResolvedValue(1);

    const startTime = performance.now();
    const result = await retryWithExponentialBackoff(mockFunc, 5);
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(500);
    expect(result).toBe(1);
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
  test("func is success on 2rd retry.", async () => {
    const mockFunc = jest
      .fn()
      .mockRejectedValueOnce(new Error("test error"))
      .mockRejectedValueOnce(new Error("test error"))
      .mockResolvedValue("success");
    const startTime = performance.now();
    const result = await retryWithExponentialBackoff(mockFunc, 2);
    const endTime = performance.now();
    expect(endTime - startTime).toBeGreaterThan(3000);
    expect(endTime - startTime).toBeLessThan(4000);
    expect(result).toBe("success");
    expect(mockFunc).toHaveBeenCalledTimes(3);
  }, 10 * 1000);
  test("func return true 3rd retry but maxRetry is 2.", async () => {
    const mockFunc = jest
      .fn()
      .mockRejectedValueOnce(new Error("test error"))
      .mockRejectedValueOnce(new Error("test error"))
      .mockRejectedValueOnce(new Error("max retry is executed but not success."))
      .mockResolvedValue(1);
    const startTime = performance.now();
    try {
      await retryWithExponentialBackoff(mockFunc, 2);
    } catch (e) {
      const endTime = performance.now();
      expect(endTime - startTime).toBeGreaterThan(3000);
      expect(endTime - startTime).toBeLessThan(4000);
      expect(mockFunc).toHaveBeenCalledTimes(3);
    }
  }, 10 * 1000);
  test("maxRetry is not integer", async () => {
    await expect(retryWithExponentialBackoff(() => true, 4.5)).rejects.toThrow();
  });
  test("maxRetry is negative", async () => {
    await expect(retryWithExponentialBackoff(() => true, -1)).rejects.toThrow();
  });
});
