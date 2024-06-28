/**
 * ## 14.6 Reflect API
 * オブジェクトやプロパティを反映するためのAPIを定義したもの。
 * 新しい機能はなく、便利な関数群を１つの名前空間に定義しただけ。
 * Relect関数のセットはProxyハンドラメソッドのセットと1:1対応している。
 * 各Reflect関数は参考書参照。
 * 
 * ## 14.7 Proxyオブジェクト
 * Javascriptのオブジェクトの基本的な動作を変更できる。
 * `Proxy`オブジェクト自体は何もせず、`target`と`handlers`に処理をdispatchする。
 * `const p = new Proxy(target, handlers)`
 * 
 * - `delete p.x`を記述した場合
 * `handler`オブジェクトの`deleteProperty`がある場合は呼び出す。
 * ない場合は、`target`オブジェクトのプロパティを削除する。
 * 
 * 取り消し可能なプロキシを作る場合は、`Proxy.revocable`が使える。
 */
function accessTheDatabase() { /* 実装は割愛。 */ return 42; }
const {proxy, revoke} = Proxy.revocable(accessTheDatabase, {});

console.log(proxy())     // => 42: proxyからターゲット関数にアクセスできる。
revoke();   // ただし、このアクセスは必要なときに取り消すことができる。
// proxy();    // !TypeError: この関数はもう呼び出せない。

/**
 * `Proxy`を使って、無限に読み取り専用のプロパティを持つ実装は下記のように書ける。
 */
// Proxyを使ってありとあらゆる可能なかぎりのプロパティを持っているように
// 見えるオブジェクトを作成する。プロパティの値は名前と同じにする。
const identity = new Proxy({}, {
    // すべてのプロパティは、値として自身の名前を持つ。
    get(o, name, target) { return name; },
    // すべてのプロパティ名は定義されている。
    has(o, name) { return true; },
    // 列挙するにはプロパティが多すぎるので、スローするだけ。
    ownKeys(o) { throw new RangeError("Infinite number of properties"); },
    // すべてのプロパティは存在するが、書き込みも再定義も列挙も不可。
    getOwnPropertyDescriptor(o, name) {
        return {
            value: name,
            enumerable: false,
            writable: false,
            configurable: false
        };
    },
    // すべてのプロパティは読み出し専用なので、設定できない。
    set(o, name, value, target) { return false; },
    // すべてのプロパティは再定義不可なので、削除できない。
    deleteProperty(o, name) { return false; },
    // すべてのプロパティは存在し再定義不可なので、追加で定義することはできない。
    defineProperty(o, name, desc) { return false; },
    // 事実上、オブジェクトは拡張不可。
    isExtensible(o) { return false; },
    // すべてのプロパティはこのオブジェクト上に定義済なので、
    // プロトタイプオブジェクトを持っていたとして何も継承できない。
    getPrototypeOf(o) { return null; },
    // オブジェクトは拡張不可なので、プロトタイプを変更できない。
    setPrototypeOf(o, proto) { return false; },
});

identity.x                  // => "x"
identity.toString           // => "toString"
identity[0]                 // => "0"
identity.x = 1;             // プロパティを設定しても何も意味はない。
identity.x                  // => "x"
delete identity.x           // => false: プロパティを削除することもできない。
identity.x                  // => "x"
// Object.keys(identity);      // !RangeError: すべてのキーを列挙することはできない。
// for(let p of identity) ;    // !RangeError

// 読み出し専用のラッパーオブジェクトを生成する関数
function readOnlyProxy(o) {
    function readonly() { throw new TypeError("Readonly"); }
    return new Proxy(o, {
        set: readonly,
        defineProperty: readonly,
        deleteProperty: readonly,
        setPrototypeOf: readonly,
    });
}