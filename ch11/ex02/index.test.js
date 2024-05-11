import { cache, slowFn } from "./index.js";

test("cache test", () => {
  // cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
  const cachedSlowFn = cache(slowFn);
  const obj = { id: 14 };
  const result1 = cachedSlowFn(obj);
  const result2 = cachedSlowFn(obj);
  const result3 = cachedSlowFn({id: 14});
  expect(result2).toBe(result1);
  expect(result3).not.toBe(result1);
});
