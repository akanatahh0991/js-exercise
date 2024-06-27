/**
 * ## 14.3 プロトタイプ属性
 * - コンストラクタ関数を使ってオブジェクト生成
 * コンストラクタのprototypeプロパティ
 * - オブジェクトリテラルを使ってオブジェクト生成
 * `Object.prototype`
 * - `Object.create`を使ってオブジェクト生成
 * `Object.create`の第一引数のオブジェクト
 * 
 * あるオブジェクトが別のオブジェクトのプロトタイプ可動かを調べる場合は`Object.isPrototypeOf`を使う。
 * `Object.prototypeOf`は`instanceof`演算子と同じような働きをする。
 * 
 * オブジェクトのプロトタイプ変更は`Object.setPrototypeOf`を使ってできる。
 * 
 * `__proto__`は読み書きできるが非推奨。(ECMAScript標準とNodeで__prototype__プロパティをサポートしているため。)
 */

console.log(Object.getPrototypeOf({})); // Object.prototype
console.log(Object.getPrototypeOf([])); // Array.prototype
console.log(Object.getPrototypeOf(() => {})); // Function.prototype

