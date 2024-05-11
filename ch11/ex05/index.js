const MAGIC_BYTES_TO_FILE_TYPE = new Map([
  [
    [0x25, 0x50, 0x44, 0x46, 0x2d],
    "PDF",
  ],
  [[0x50, 0x4b, 0x03, 0x04], "ZIP"],
  [[0x50, 0x4b, 0x05, 0x06], "ZIP"],
  [[0x50, 0x4b, 0x07, 0x08], "ZIP"],
  [[0x47, 0x49, 0x46, 0x38, 0x37, 0x61], "GIF"],
  [[0x47, 0x49, 0x46, 0x38, 0x39, 0x61], "GIF"],
  [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], "PNG"],
]);

/**
 * バイナリデータの先頭バイトからファイル種別を推測する。
 * @param {ArrayBuffer} buffer
 */
export function detectFileType(buffer) {
  const bytes = new Uint8Array(buffer);
  const key = Array.from(MAGIC_BYTES_TO_FILE_TYPE.keys()).find((key) => {
    if (bytes.length < key.length || bytes.length === 0) {
        return false;
    }
    return bytes.slice(0, key.length - 1).every((v, i) => v === key[i]);
  })
  return MAGIC_BYTES_TO_FILE_TYPE.get(key) ?? "UNKNOWN";
}

console.log(detectFileType(new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0x00, 0x00, 0x00]).buffer))
