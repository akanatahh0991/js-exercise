/**
 * ## 14.2 オブジェクトの拡張性
 * javascriptのオブジェクトではデフォルトでextensibleはtrue。
 * 拡張性とはオブジェクトに新しいプロパティを追加できるかどうか。
 * 
 * - 拡張可能か確認
 * `Object.isExtensible()`
 * - 拡張不可に変更
 * `Object.preventExtensions()`
 */

const obj = {
    x: 1
}

const proto = {}

console.log(Object.isExtensible(obj));
Object.preventExtensions(obj);
// Object.setPrototypeOf(obj, proto); // プロトタイプの差し替えはTypeErrorがthrow
// 元のプロトタイプに対する変更は可能

/**
 * ### 封印したオブジェクト
 * - `Object.seal`はオブジェクトを拡張不可かつ独自プロパティの再定義不可にする。ただし、書き込み可のプロパティ変更はできる
 * - `Object.isSealed`で確認できる
 * ### 凍結したオブジェクト
 * - `Object.freeze`はオブジェクトを拡張不可かつ独自プロパティの再定義不可にし、さらに読み出し専用にする。(setterは使える)
 * - `Object.isFrozen`で確認できる
 * 
 * 一度、封印、凍結したオブジェクトは元に戻らない。
 */