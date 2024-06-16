import {
  fetchFirstFileSizePromised,
  fetchSumOfFileSizesPromised,
} from "./index.js";
import path from "path";
import { fileURLToPath } from "url";
import * as fs from "node:fs";
import * as mPath from "path";

// 現在のモジュールのURLをファイルパスに変換
const __filename = fileURLToPath(import.meta.url);

// ファイルパスからディレクトリパスを取得
const __dirname = path.dirname(__filename);

function absoluePath(relativePath) {
  return path.resolve(__dirname, relativePath);
}

describe("test fetchFirstFileSizePromised", () => {
  test("success to fetch first file size in multi files", () => {
    const testDir = absoluePath("./testdir");
    const result = asyncFetchFirstFileSize(testDir);
    return Promise.all([fetchFirstFileSizePromised(testDir), result]).then(
      (values) => {
        expect(values[0]).toBe(values[1]);
      }
    );
  });
  test("success to fetch empty directory", () => {
    const emptyDir = absoluePath("./empty");
    const result = asyncFetchFirstFileSize(emptyDir);
    return Promise.all([fetchFirstFileSizePromised(emptyDir), result]).then(
      (values) => {
        expect(values[0]).toBe(values[1]);
      }
    );
  });
  test("fail to fetch not directory", () => {
    const filePath = absoluePath("./file.txt");
    const result = asyncFetchFirstFileSize(filePath);
    return Promise.allSettled([
      fetchFirstFileSizePromised(filePath),
      result,
    ]).then((results) => {
      expect(results[0]).toStrictEqual(results[1]);
    });
  });
});

describe("test fetchSumOfFileSizesPromised", () => {
  test("success to fetch total size in directory storing multi files", () => {
    const testDir = absoluePath("./testdir");
    const result = asyncFetchSumOfFileSizes(testDir);
    return Promise.all([fetchSumOfFileSizesPromised(testDir), result]).then(
      (values) => {
        expect(values[0]).toBe(values[1]);
      }
    );
  });
  test("success to fetch empty directory", () => {
    const emptyDir = absoluePath("./empty");
    const result = asyncFetchSumOfFileSizes(emptyDir);
    return Promise.all([fetchSumOfFileSizesPromised(emptyDir), result]).then(
      (values) => {
        expect(values[0]).toBe(values[1]);
      }
    );
  });
  test("fail to fetch not directory", () => {
    const filePath = absoluePath("./file.txt");
    const result = asyncFetchSumOfFileSizes(filePath);
    return Promise.allSettled([
      fetchSumOfFileSizesPromised(filePath),
      result,
    ]).then((results) => {
      expect(results[0]).toStrictEqual(results[1]);
    });
  });
});

function asyncFetchFirstFileSize(dirPath) {
  function fetchFirstFileSize(path, callback) {
    fs.readdir(path, (err, files) => {
      if (err) {
        callback(err);
        return;
      }
      if (files.length === 0) {
        callback(null, null);
        return;
      }

      fs.stat(mPath.join(path, files[0]), (err, stats) => {
        if (err) {
          callback(err);
          return;
        }
        callback(null, stats.size);
      });
    });
  }
  return new Promise((resolve, reject) => {
    const callback = (err, size) => {
      if (err) {
        reject(err);
      } else {
        resolve(size);
      }
    };
    fetchFirstFileSize(dirPath, callback);
  });
}

function asyncFetchSumOfFileSizes(dirPath) {
  function fetchSumOfFileSizes(path, callback) {
    fs.readdir(path, (err, files) => {
      if (err) {
        callback(err);
        return;
      }

      let total = 0;
      const rest = [...files];

      function iter() {
        if (rest.length === 0) {
          callback(null, total);
          return;
        }

        const next = rest.pop();
        fs.stat(mPath.join(path, next), (err, stats) => {
          if (err) {
            callback(err);
            return;
          }
          total += stats.size;
          iter();
        });
      }
      iter();
    });
  }
  return new Promise((resolve, reject) => {
    const callback = (err, total) => {
      if (err) {
        reject(err);
      } else {
        resolve(total);
      }
    };
    fetchSumOfFileSizes(dirPath, callback);
  });
}
