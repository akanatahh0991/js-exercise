const m = new Map([["one", 1], ["two", 2]]);
for (const [k, v] of m) console.log(k, v);

class Range {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }

    has(x) {
        return typeof x === 'number' && this.from <= x && x <= this.to;
    }

    toString() {
        return `{ x | ${this.from} =< x =< ${this.to}}`;
    }

    [Symbol.iterator]() {
        let next = Math.ceil(this.from);
        const last = this.to;
        return {
            next() {
                return (next <= last) ? { value: next++ } : { done: true}
            },

            [Symbol.iterator]() {
                return this;
            }
        }
    }
}

for (const x of new Range(1, 10)) console.log(x);
console.log([...new Range(-2, 2)]);

function map(iterable, f) {
    const iterator = iterable[Symbol.iterator]()
    return {
        [Symbol.iterator]() { return this; },
        next() {
            const v = iterator.next();
            if (v.done) {
                return v;
            } else {
                return { value: f(v.value)}
            }
        }
    }
};

console.log([...map(new Range(1, 4), x => x**2 )]);

/**
 * 
 * @param {string} s 
 * @returns 
 */
function words(s) {
    const r = /\s+|$/g;
    // 最初の非空白文字から始める
    r.lastIndex = s.match(/[^ ]/).index;
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            const start  = r.lastIndex;
            if (start < s.length) {
                const match = r.exec(s);
                if (match) {
                    return {
                        value: s.substring(start, match.index)
                    }
                }
            }
            return { done: true }
        }
    }
}

console.log([...words(" abc def ghi! ")]);

function* oneDigitPrimes() {
    yield 2;
    yield 3;
    yield 5;
    yield 7;
}

const primes = oneDigitPrimes();
console.log(primes.next().value);
console.log(primes.next().value);
console.log(primes.next().value);
console.log(primes.next().value);
console.log(primes.next().done);

const seq = function*(from, to) {
    for (let i = from; i <= to; i++) yield i;
}

console.log([...seq(3, 5)]);
