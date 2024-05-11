// f はオブジェクトを1つ引数に取る関数
export function cache(f) {
  const cacheMap = new WeakMap();
  // この関数を実装する
  return function(obj) {
    const cacheResult = cacheMap.get(obj)
    if (cacheResult !== undefined) {
      return cacheResult;
    }
    const result = f(obj);
    cacheMap.set(obj, result);
    return result;
  }
}

export function slowFn(obj) {
  console.log("slowFn start")
  // 時間のかかる処理
  let i = 0;
  while (i < 100000000) i++;
  console.log("slowFn end")
  return {result: obj}
}

