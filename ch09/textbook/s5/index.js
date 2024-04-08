
// ES6までの継承の仕方
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

function Span(start, span) {
    if (span >= 0) {
        this.from = start;
        this.to = start + span;
    } else {
        this.to = start;
        this.from = start + span;
    }
}

// SpanのプロトタイプがRangeのプロトタイプを継承する。
Span.prototype = Object.create(Range.prototype);
// Range.prototype.constructorは継承したくないので、Spanをセットする
Span.prototype.constructor = Span;

Span.prototype.toString = function() {
    return `(${this.from}... + ${this.to - this.from})`;
}


class EZArray extends Array {
    get first() { return this[0]}
    get last() { return this[this.length - 1]}
}

const a = new EZArray();
a.push(1, 2, 4, 5, 6)
console.log(a.first, a.last)

class TypedMap extends Map {
    constructor(keyType, valueType, entries) {
        if (entries) {
            for (const [k, v] of entries) {
                if (typeof k !== keyType || typeof v !== valueType) {
                    throw new TypeError(`Wrong type for entry [${k}, ${v}]`)
                }
            }
        }
        super(entries);
        this.keyType = keyType;
        this.valueType = valueType;
    }

    set(key, value) {
        if (this.keyType && typeof key !== this.keyType) {
            throw new TypeError(`${key} is not of type ${this.keyType}`);
        }
        if (this.valueType && typeof value !== this.valueType) {
            throw new TypeError(`${value} is not of type ${this.valueType}`);
        }
        return super.set(key, value);
    }
}

console.log(this);
