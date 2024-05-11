
/**
 * 特定の型と値をセットに保持するマップ
 */
export class TypeMap {

    #map = new Map();

    /**
     * `constructorFunc`をキーとして`value`をセットする。
     * `constructorFunc`は以下を指定できる
     * - `value`がオブジェクトの場合、コンストラクタ関数
     * - `value`がプリミティブ型の場合は、ラッパークラスのコンストラクタ関数
     * `constructorFunc`が上記を満たさない場合`TypeError`がthrowされる。
     * `value`は`constructorFunc`で生成されるオブジェクトを指定できる。
     * `value`に`null`, `undefined`, 関数が指定された場合は`TypeError`となる。
     */
    set(constructorFunc, value) {
        if (value == null || value == undefined || typeof value === 'function') {
            throw new TypeError(`set invalid value=${value}`)
        }
        if (
            (typeof value === 'boolean' && constructorFunc !== Boolean) 
            || (typeof value === 'string' && constructorFunc !== String)
            || (typeof value === 'number' && constructorFunc !== Number)
            || (typeof value === 'bigint' && constructorFunc !== BigInt)
            || (typeof value === 'symbol' && constructorFunc !== Symbol)
            || (typeof value === 'object' && !(value instanceof constructorFunc))
        ) {
            throw new TypeError(`set invalid param: constructorFunc=${constructorFunc}, value=${value}`)
        }
        this.#map.set(constructorFunc, value);
    }

    /**
     * `constructorFunc`に対する値を取得する
     * @param {Function} constructorFunc コンストラクタ関数
     * @returns `constructorFunc`に対応する値。ない場合は`undefined`を返す。
     */
    get(constructorFunc) {
        return this.#map.get(constructorFunc)
    }
}