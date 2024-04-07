
/**
 * KeyとValueの型を指定するマップ
 */
export class TypedMap {

    /**
     * `TypedMap`のコンストラクタ
     * @param {string} keyType keyの型の文字列
     * @param {string} valueType valueの型の文字列
     * @param {object} entries [key, value]でイテレート可能なオブジェクト。ない場合は省略すること。
     * @throws {TypeError} `entries`が指定した`keyType`、`valueType`の型ではない要素を持つ場合にthrowされる。
     */
    constructor(keyType, valueType, entries) {
        if (entries) {
            for (const [k, v] of entries) {
                if (typeof k !== keyType || typeof v !== valueType) {
                    throw new TypeError(`Wrong type for entry [${k}, ${v}]`)
                }
            }
        }
        this._map = new Map(entries);
        this._keyType = keyType;
        this._valueType = valueType;
    }

    /**
     * `key`と`value`をセットする。
     * @param {any} key コンストラクタで指定した型のkey
     * @param {any} value コンストラクタで指定した型のvalue
     * @throws {TypeError} コンストラクタに指定した`keyType`、`valueType`の型ではない要素を指定した場合にthrowされる。
     */
    set(key, value) {
        if (typeof key !== this._keyType || typeof value !== this._valueType) {
            throw new TypeError(`Wrong type for [${key}, ${value}]`)
        }
        this._map.set(key, value);
    }

    entries() {
        return this._map.entries();
    }
}

const map = new TypedMap("string", "number", [["a", 1], ["b", 2]]);
map.set("c", 3);
console.log(Array.from(map.entries()))