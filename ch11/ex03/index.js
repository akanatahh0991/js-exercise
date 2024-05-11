
/**
 * `littleEndianBytes`をビッグエンディアンに変換する。
 * @param {Uint32Array} littleEndianBytes リトルエンディアンの4バイト配列
 */
export function convertToBigEndian(littleEndianBytes) {
    const bigEndianBytes = new Uint32Array(littleEndianBytes.length);
    const dataview = new DataView(littleEndianBytes.buffer);
    for (let i = 0; i < bigEndianBytes.length; i++) {
        bigEndianBytes[i] = dataview.getUint32(i * 4, true)
    }
    return bigEndianBytes;
}

/**
 * `bigEndianBytes`をリトルエンディアンに変換する。
 * @param {Uint32Array} bigEndianBytes ビッグエンディアンの4バイト配列
 */
export function convertToLittleEndian(bigEndianBytes) {
    const littleEndianBytes = new Uint32Array(bigEndianBytes.length);
    const dataview = new DataView(bigEndianBytes.buffer);
    for (let i = 0; i < littleEndianBytes.length; i++) {
        littleEndianBytes[i] = dataview.getUint32(i * 4, false)
    }
    return littleEndianBytes;
}

// console.log(convertToBigEndian(new Uint32Array([0, 1, 2, 3])).buffer);
// console.log(convertToLittleEndian(new Uint32Array([0, 1, 2, 3])).buffer)