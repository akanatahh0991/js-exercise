

/**
 * `Object.assign`と同等の動作をする関数
 * @param {object} target 
 * @param  {...object} sources
 */
export function assign(target, ...sources) {
  /**
   * `arg`をオブジェクトに変換する。
   * `arg`が`null`または`undefined`の場合は`TypeError`がthrowされる。
   * @param {any} arg 
   * @returns {object} 変換後のオブジェクト
   * @throws {TypeError} `args`が`null`または`undefined`の場合
   */
  function toObj(arg) {
    if (arg === null || arg === undefined ) {
      throw new TypeError("args is null or undefined");
    }
    // 以下はObject(arg)でも同じ
    switch(typeof arg) {
      case "number":
        return new Number(arg);
      case "string":
        return new String(arg);
      case "boolean":
        return new Boolean(arg);
      case "symbol":
        return Object(arg);
      case "bigint":
        return Object(arg);
    }
    return arg;
  }
  const targetObj = toObj(target);
  if (sources.length === 0) {
    return targetObj;
  }
  sources.forEach((source) => {
    if (source === null || source === undefined) {
      return;
    }
    const sourceObj = toObj(source);
    const sourceObjKeys = Reflect.ownKeys(sourceObj);
    sourceObjKeys.forEach((sourceObjkey) => {
      const descripter = Object.getOwnPropertyDescriptor(sourceObj, sourceObjkey);
      if (descripter !== undefined && descripter.enumerable === true) {
        targetObj[sourceObjkey] = sourceObj[sourceObjkey];
      }
    })
  })
  return targetObj;
}




