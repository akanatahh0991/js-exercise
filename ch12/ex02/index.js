/**
 * fibonacciSequence同等のイテレーター
 */
export function fibonacciIterator() {
    let x = 0, y = 1;
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            const preY = y;
            [x, y] = [y, x + y];
            return {
                done: false,
                value: preY
            };
        }
    }
};

const it = fibonacciIterator();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());