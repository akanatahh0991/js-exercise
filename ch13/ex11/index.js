
/**
 * `maxRetry`までリトライ処理をおこなう。
 * 以下の仕様に従う。
 * - `maxRetry`に0を指定した場合はリトライせず、`func`を即座に呼び出す。
 * - 受け取った関数 `func` を呼び出し、funcが値を返せばそこで終了する
 * - `func` が `false` を返した場合は以下の待ち時間後に `func` 呼び出しをリトライする
 * - 待ち時間は`func`の呼び出し回数に応じて1秒, 2秒, 4秒, ...と2倍に増えていく
 * - `maxRetry` 回リトライしても成功しない場合はそこで終了する
 * - `retryWithExponentialBackoff`に対する呼び出しは即座に完了し、`func` の呼び出しは非同期に行われる
 * - `func` の返り値が成功した場合はその値で解決したPromise、maxRetry回のリトライが失敗した場合は失敗したPromiseを返す。
 * @param {async () => any} func 処理。成功した場合はtrueを返すこと。
 * @param {number} maxRetry 最大リトライ回数。0以上の整数値を指定すること。
 * @return {Promise<any>} 結果
 */
export async function retryWithExponentialBackoff(func, maxRetry) {
    if (!Number.isInteger(maxRetry) || maxRetry < 0) {
        throw new TypeError(`invalid maxRetry: ${maxRetry}`)
    }

    async function retryFunc(count) {
        return new Promise((resolve, reject) => {
            if (count >= maxRetry) {
                reject(new Error("max retry is executed but not success."))
            }
            setTimeout(() => {
                func()
                .then((value) => resolve(value))
                .catch(() => retryFunc(++count))
                .then((value) => resolve(value))
                .catch((e) => reject(e))
            }, (2 ** count) * 1000)
        })
    }

    try {
        return await func()
    } catch(e) {
        return await retryFunc(0)
    }
}