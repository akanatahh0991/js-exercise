
/**
 * `obj`のメソッド呼び出しの履歴を保存するProxyを作成してバインドする。
 * `proxy`経由で呼び出した`obj`のメソッドの呼び出し履歴は`proxy.accessHistory`に保存される。
 * `proxy.accessHistory`は呼び出し履歴の`Date`である`calledDate`, 呼び出したメソッドである`methodName`, その引数`args`のオブジェクトの配列。
 * @param {object} obj オブジェクト
 * @returns `obj`と`proxy`を保持するオブジェクト
 * @throws `obj`が`null`または`undefined`の場合にthrowされる。
 */
export function bindAccessHistorySavingProxy(obj) {
    if (obj === null || obj === undefined) {
        throw new TypeError("object must not be null or undefined.")
    }
    const accessHistory = []
    const handler = {
        get(target, property, receiver) {
            const value = Reflect.get(target, property, receiver);
            if (Reflect.ownKeys(target).includes(property) && (typeof value === "function")) {
                return function(...args) {
                    accessHistory.push({
                        calledDate: new Date(),
                        methodName: property,
                        args: args
                    })
                    return Reflect.apply(value, target, args)
                }
            }
            return value;
        }
    }
    const p = new Proxy(obj, handler)
    p["accessHistory"] = accessHistory;
    return {
        obj,
        proxy: p
    };
}