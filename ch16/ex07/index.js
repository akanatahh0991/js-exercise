import fs from "fs";

/**
 * `entryPath`の示すエントリの種類を文字列で返す。
 * 存在しないファイルの場合はエラーで拒否される。
 * @param {string} entryPath 
 * @returns エントリを表す文字列
 */
export async function checkEntry(entryPath) {
    const lstats = await fs.promises.lstat(entryPath)
    if (lstats.isFile()) {
        return 'file';
    }
    if (lstats.isDirectory()) {
        return 'directory';
    }
    if (lstats.isSymbolicLink()) {
        return 'symboliclink';
    }
    if (lstats.isBlockDevice()) {
        return 'blockdevice';
    }
    if (lstats.isCharacterDevice()) {
        return 'characterdevice';
    }
    if (lstats.isSocket()) {
        return 'socket';
    }
    if (lstats.isFIFO()) {
        return 'fifo';
    }
    return 'unknown entry'
}