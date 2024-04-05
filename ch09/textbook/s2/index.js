function Range(from, to) {
    this.from = from;
    this.to = to;
}

Range.prototype = {
    constructor: Range,
    includes(x) {
        return this.from <= x && x <= this.to;
    },

    *[Symbol.iterator](){
        for (let x = Math.ceil(this.from); x <= this.to; x++) yield x;
    },

    toString() {
        return `(${this.from} ... ${this.to})`
    }
}

// Rangeのデフォルトで設定されるprototypeに足す形が昔は普通のやり方だった
// Range.prototype.includes = function(x) {
//     return this.from <= x && x <= this.to;
// }

const r = new Range(1, 3);
console.log(r.includes(2));
console.log(r.toString());
console.log([...r]);

const F = function() {};
const p = F.prototype;
const c = p.constructor;
console.log(c === F); // true