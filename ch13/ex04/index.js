import * as fsPromises from "node:fs/promises";
import * as mPath from "path";

/**
 * `path`で指定したディレクトリの一つ目のファイルのサイズを取得する。
 * @param {string} path ディレクトリの絶対パス
 * @returns {Promise} `path`で指定したディレクトリの一つ目のファイルのサイズの取得をおこなう`Promise`
 */
export function fetchFirstFileSizePromised(path) {
  return new Promise((resolve, reject) => {
    fsPromises
      .readdir(path)
      .then((files) => {
        if (files.length === 0) {
          resolve(null);
        } else {
          fsPromises
            .stat(mPath.join(path, files[0]))
            .then((stats) => {
              resolve(stats.size);
            })
            .catch((err) => {
              reject(err);
            });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * `path`で指定したディレクトリ全てのファイルのサイズの取得をおこなう。
 * @param {string} path ディレクトリの絶対パス
 * @returns {Promise} `path`で指定したディレクトリ全てのファイルのサイズの取得をおこなう`Promise`
 */
export function fetchSumOfFileSizesPromised(path) {
  return fsPromises
    .readdir(path)
    .then((files) => {
      const rest = [...files];
      function iter(total) {
        return new Promise((resolve, reject) => {
          if (rest.length === 0) {
            resolve(total);
          } else {
            const next = rest.pop();
            fsPromises
              .stat(mPath.join(path, next))
              .then((stats) => iter(total + stats.size))
              .then((size) => resolve(size))
              .catch((err) => reject(err));
          }
        });
      }
      return iter(0)
    })
}
