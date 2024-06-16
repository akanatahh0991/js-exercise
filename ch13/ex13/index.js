import * as fsPromises from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

// 現在のモジュールのURLをファイルパスに変換
const __filename = fileURLToPath(import.meta.url);

// ファイルパスからディレクトリパスを取得
const __dirname = path.dirname(__filename);

/**
 * 指定されたディクトリ内のファイル/ディレクトリをを再帰的に探索するジェネレータ関数。
 * @param {string} rootPath ディレクトリのパス 
 * @throws `rootPath`に不正な値が格納された場合、`TypeError`がthrowされる。
 */
export async function* walk(rootPath) {
    async function* walkDirRecursively(dirPath) {
        let dir;
        try {
            dir = await fsPromises.opendir(dirPath);
            yield {
                path: dirPath,
                isDirectory: true
            }
            let dirent;
            while((dirent = await dir.read()) !== null) {
                const direntPath = path.join(dirPath, dirent.name);
                if (dirent.isDirectory()) {
                    yield* walkDirRecursively(direntPath)
                } else {
                    yield {
                        path: direntPath,
                        isDirectory: false
                    }
                }
            }
        } catch (e) {
            console.log("walkDirRecursively is finished by error" + e)
        } finally {
            await dir.close()
        }
    }

    const absolutePath = path.isAbsolute(rootPath) ? rootPath : path.resolve(__dirname, rootPath);
    console.log(absolutePath);
    try {
        if (await (await fsPromises.stat(absolutePath)).isFile()) {
            yield {
                path: absolutePath,
                isDirectory: false
            }
        } else {
            yield* walkDirRecursively(absolutePath)
        }
    } catch (e) {
        throw new TypeError(`invalid rootPath ${rootPath}`)
    }
    
}