const bytes = new Uint8Array(1024);
const matrix = new Float64Array(9);
const point = new Int16Array(3);
const rgba = new Uint8ClampedArray(4);
const sudoku = new Int8Array(81);

const white = Uint8ClampedArray.of(255, 255, 255, 0);
const ints = Uint32Array.from(white);
// console.log(bytes, matrix, point, rgba, sudoku, white, ints);

const buffer = new ArrayBuffer(1024 * 1024);
console.log(buffer.byteLength);

const asbytes = new Uint8Array(buffer);
console.log(asbytes)

/**
 * n以下の素数の最大値を返す
 * @param {number} n 自然数
 * @returns n以下の素数の最大値
 */
function sieve(n) {
    const a = new Uint8Array(n + 1);
    const max = Math.floor(Math.sqrt(n));
    let p = 2;

    while(p <= max) {
        for(let i = 2 * p; i <= n; i += p) {
            a[i] = 1;
        }
        white(a[++p])
    }
    while(a[n]) n--;
    return n;
}



