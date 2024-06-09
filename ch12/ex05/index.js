import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 現在のモジュールのURLをファイルパスに変換
const __filename = fileURLToPath(import.meta.url);

// ファイルパスからディレクトリパスを取得
const __dirname = path.dirname(__filename);

/**
 * 指定されたファイルパスを受け取り、そのファイルを改行コード `\n` の出現ごとに分割して返すジェネレータ関数
 * @param {string} path テキストファイル(UTF-8)のパス
 * @param {number} bufferSize バッファーサイズ(Byte)。デフォルトは1024Byte。
 */
export function* readLines(filePath, bufferSize = 1024) {
    let fd;
    let bytes;
    let restText = '';
    const buffer = Buffer.alloc(bufferSize);
    const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(__dirname, filePath);
    try {
        fd = fs.openSync(absolutePath, 'r');
        while((bytes = fs.readSync(fd, buffer, 0, bufferSize, null)) !== 0) {
            const readText = restText + buffer.toString('utf-8', 0, bytes);
            const lines = readText.split('\n');

            restText = lines.pop();

            yield* lines
        }
        if (restText !== '') {
            yield restText;
        }
    } catch(e) {
        console.e('error occurred: ' + e )
    } finally {
        fs.closeSync(fd)
    }
}