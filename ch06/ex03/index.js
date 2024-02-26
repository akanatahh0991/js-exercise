// P149の実装
let o = {};
o.x = 1;
let p = Object.create(o);
p.y = 2;
let q = Object.create(p);
q.z = 3;
//let f = q.toString();
q.x + q.y;
// 全てtrue
console.log(`o in prototype chain of p is ${Object.prototype.isPrototypeOf.call(Object.getPrototypeOf(o), p)}`);
console.log(`o in prototype chain of q is ${Object.prototype.isPrototypeOf.call(Object.getPrototypeOf(o), q)}`);
console.log(`p in prototype chain of q is ${Object.prototype.isPrototypeOf.call(Object.getPrototypeOf(p), q)}`);

/**
 * {obj}のプロトタイプチェーンの継承関係を出力する。
 * 子->親という形式の文字列で出力される。
 * @param {object} obj 
 * @returns 子->親という形式の文字列
 */
function outputPrototypeChainFrom(obj) {
  const result = []
  let target = obj;
  while(target !== null) {
    target = Object.getPrototypeOf(target);
    if (target !== null) {
      result.push(target.constructor.name);
    }
  }
  return result.join(' -> ');
}

console.log(outputPrototypeChainFrom(new Object()))
console.log(outputPrototypeChainFrom(new Array()))
console.log(outputPrototypeChainFrom(new Date()))
console.log(outputPrototypeChainFrom(new Map()))

