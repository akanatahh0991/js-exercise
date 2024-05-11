
/**
 * `maxRetry`までリトライ処理をおこなう。
 * 以下の仕様に従う。
 * - `maxRetry`に0を指定した場合はリトライせず、`func`を即座に呼び出す。
 * - 受け取った関数 `func` を呼び出し、funcがtrueを返せばそこで終了する
 * - `func` が `false` を返した場合は以下の待ち時間後に `func` 呼び出しをリトライする
 * - 待ち時間は`func`の呼び出し回数に応じて1秒, 2秒, 4秒, ...と2倍に増えていく
 * - `maxRetry` 回リトライしても成功しない場合はそこで終了する
 * - `retryWithExponentialBackoff`に対する呼び出しは即座に完了し、`func` の呼び出しは非同期に行われる
 * - `func` が `true` を返す、またはmaxRetry回のリトライが失敗し終了する際、その結果(`true`/`false`)を引数として関数 `callback` が呼び出される
 * @param {() => boolean} func 処理。成功した場合はtrueを返すこと。
 * @param {number} maxRetry 最大リトライ回数。0以上の整数値を指定すること。
 * @param {(boolean) => undefined} callback コールバック関数。引数には結果が代入される。
 */
export function retryWithExponentialBackoff(func, maxRetry, callback) {
    if (!Number.isInteger(maxRetry) || maxRetry < 0) {
        throw new TypeError(`invalid maxRetry: ${maxRetry}`)
    }
    const retryFunc = (count, callback) => {
        if (count >= maxRetry) {
            callback(false)
            return
        }
        setTimeout(() => {
            if (func()) {
                callback(true)
            } else {
                retryFunc(++count, callback)
            }
        }, (2 ** count) * 1000)
    }

    setTimeout(() => {
        if (func()) {
            callback(true)
        } else {
            retryFunc(0, callback)
        }
    }, 0)
}