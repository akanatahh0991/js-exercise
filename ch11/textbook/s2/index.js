// const bytes = new Uint8Array(1024);
// const matrix = new Float64Array(9);
// const point = new Int16Array(3);
// const rgba = new Uint8ClampedArray(4);
// const sudoku = new Int8Array(81);

// const white = Uint8ClampedArray.of(255, 255, 255, 0);
// const ints = Uint32Array.from(white);
// console.log(bytes, matrix, point, rgba, sudoku, white, ints);

const buffer = new ArrayBuffer(1024 * 1024);
// console.log(buffer.byteLength);

// 256は8bitで表せないので0になる。
const pattern = new Uint8Array([0,1,2,3,4,15, 255, 256]);
console.log(pattern);
console.log(pattern.buffer);
const fourByteArray = new Uint32Array([0, 255, 256, 1023, 1024]);
console.log(fourByteArray);
console.log(fourByteArray.buffer)

const newInts2 = new Uint32Array()

/**
 * n以下の素数の最大値を返す
 * @param {number} n 自然数
 * @returns n以下の素数の最大値
 */
function sieve(n, isUsingTypedArray) {
    const a = isUsingTypedArray ? new Uint8Array(n + 1) : new Array(n + 1);
    const max = Math.floor(Math.sqrt(n));
    let p = 2;

    while(p <= max) {
        for(let i = 2 * p; i <= n; i += p) {
            a[i] = 1;
        }
        while(a[++p]) { 
            // 何もしない
        }
    }
    while(a[n]) n--;
    return n;
}

function test(fn, ...args) {
    const start = performance.now();
    fn.call(null, ...args)
    const end = performance.now();
    return (end - start)
}

console.log(test(sieve, 10000000, true));
console.log(test(sieve, 10000000, false));


// const ints = new Int16Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
// const last3 = ints.subarray(ints.length -3, ints.length);
// console.log(last3[2]);

// ints[9] = -1;
// console.log(last3[2]);

// console.log(last3.buffer);

// const uints = new Uint32Array([0, 1, 2, 255, 4095, 4096, 8191]);
// console.log(uints.buffer, uints.byteOffset, uints.byteLength);
// const view = new DataView(uints.buffer, uints.byteOffset, uints.byteLength);
// console.log(view.getUint32(1, true))
// console.log(view.getUint32(1, false))
// view.setUint32()


