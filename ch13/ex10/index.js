import * as fsPromises from "node:fs/promises";
import * as mPath from "path";

/**
 * `path`で指定したディレクトリ全てのファイルのサイズの取得をおこなう。
 * @param {string} path ディレクトリの絶対パス
 * @returns {Promise} `path`で指定したディレクトリ全てのファイルのサイズの取得をおこなう`Promise`
 */
export async function fetchSumOfFileSizesPromised(path) {
  const files = await fsPromises.readdir(path);
  return await Promise.all(
    files.map((file) =>
      fsPromises.stat(mPath.join(path, file)).then((stats) => stats.size)
    )
  ).then((sizes) => sizes.reduce((sum, size) => sum + size, 0));
}
