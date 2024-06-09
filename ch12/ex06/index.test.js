import { walk } from "./index.js";
import path from 'path';
import { fileURLToPath } from 'url';

describe("test walk", () => {
    it("empty directory path", () => {
        expect([...walk('./empty')]).toStrictEqual([entry('./empty', true)])
    });
    it("multiple hierarchies directory path", () => {
        expect(new Set([...walk('./testdir')])).toStrictEqual(new Set([
            entry('./testdir', true),
            entry('./testdir/dir11', true),
            entry('./testdir/dir12', true),
            entry('./testdir/file1.txt', false),
            entry('./testdir/dir11/dir111', true),
            entry('./testdir/dir11/dir112', true),
            entry('./testdir/dir11/file11.txt', false),
            entry('./testdir/dir11/dir111/file111.txt', false),
            entry('./testdir/dir11/dir112/file112.txt', false),
            entry('./testdir/dir12/file12.txt', false),
            entry('./testdir/dir12/dir121', true),
            entry('./testdir/dir12/dir121/file121.txt', false)
        ]))
    });
    it("file path", () => {
        expect([...walk('./file.txt')]).toStrictEqual(
            [entry('./file.txt', false)]
        )
    });
    it("not found path", () => {
        expect(() => [...walk('./invalid')]).toThrow()
    });

})

// 現在のモジュールのURLをファイルパスに変換
const __filename = fileURLToPath(import.meta.url);

// ファイルパスからディレクトリパスを取得
const __dirname = path.dirname(__filename);

function entry(relativePath, isDirectory) {
    return {
        path: path.resolve(__dirname, relativePath),
        isDirectory
    }
}