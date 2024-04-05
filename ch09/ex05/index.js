/**
 * `instanceof`同等の動作をする。
 * @param {object} object 対象のオブジェクト。
 * @param {function} constructor 判定に使用するコンストラクタ関数
 */
export function instanceOf(object, constructor) {
    if (typeof constructor !== 'function') {
        throw new TypeError("constructor must be function");
    }
    if (object === null || typeof object !== 'object') {
        return false;
    }

    let objectProto = object.__proto__
    while(objectProto !== null) {
        if (objectProto === constructor.prototype) {
            return true;
        }
        objectProto = objectProto.__proto__;
    }
    return false;
}