import * as fsPromises from "node:fs/promises";
import * as mPath from "path";

/**
 * `path`で指定したディレクトリの一つ目のファイルのサイズを取得する。
 * @param {string} path ディレクトリの絶対パス
 * @returns {Promise} `path`で指定したディレクトリの一つ目のファイルのサイズの取得をおこなう`Promise`
 */
export async function fetchFirstFileSizePromised(path) {
  const files = await fsPromises.readdir(path);
  if (files.length === 0) {
    return null;
  }

  return await fsPromises
    .stat(mPath.join(path, files[0]))
    .then((stats) => stats.size);
}

/**
 * `path`で指定したディレクトリ全てのファイルのサイズの取得をおこなう。
 * @param {string} path ディレクトリの絶対パス
 * @returns {Promise} `path`で指定したディレクトリ全てのファイルのサイズの取得をおこなう`Promise`
 */
export async function fetchSumOfFileSizesPromised(path) {
  const files = await fsPromises.readdir(path);
  async function iter(total) {
    if (files.length === 0) {
      return total;
    }
    const next = files.pop();
    return await fsPromises
      .stat(mPath.join(path, next))
      .then((stats) => iter(total + stats.size));
  }
  return iter(0);
}
