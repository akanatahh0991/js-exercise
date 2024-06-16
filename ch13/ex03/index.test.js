import { readdir, stat } from "./index.js";
import path from "path";
import { fileURLToPath } from "url";

// 現在のモジュールのURLをファイルパスに変換
const __filename = fileURLToPath(import.meta.url);

// ファイルパスからディレクトリパスを取得
const __dirname = path.dirname(__filename);

function absoluePath(relativePath) {
  return path.resolve(__dirname, relativePath);
}

describe("test readdir", () => {
  it("success to read directory", () => {
    const allFiles = [];
    return readdir(absoluePath("./testdir1"))
      .then((files) => {
        allFiles.push(...files);
      })
      .then(() => readdir(absoluePath("./testdir2")))
      .then((files) => {
        allFiles.push(...files);
      })
      .then(() => {
        expect(new Set(allFiles)).toStrictEqual(
          new Set(["file11.txt", "file12.txt", "file21.txt", "file22.txt"])
        );
      });
  });
  it("failed to read not found directory", () => {
    const invalidDirPath = absoluePath("./invalid");
    return readdir(invalidDirPath).catch((err) => {
      expect(err.path).toBe(invalidDirPath);
    });
  });
});

describe("test stat", () => {
    it("success to stat directory", () => {
        return stat(absoluePath('./testdir1'))
        .then((stats) => {
            expect(stats.isDirectory()).toBe(true);
        })
    });
    it("success to stat file", () => {
        return stat(absoluePath('./testdir1/file11.txt'))
        .then((stats) => {
            expect(stats.isFile()).toBe(true);
        })
    });
    it("failed to stat not found directory", () => {
        const invalidDirPath = absoluePath("./invalid");
        return stat(absoluePath(invalidDirPath))
        .catch((err) => {
            expect(err.path).toBe(invalidDirPath);
        })
    });
    it("failed to stat not found file", () => {
        const invalidFilePath = absoluePath("./testdir1/invalid1.txt");
        return stat(absoluePath(invalidFilePath))
        .catch((err) => {
            expect(err.path).toBe(invalidFilePath);
        })
    });
})


