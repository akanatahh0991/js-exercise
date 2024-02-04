
/**
 * JSON文字列をオブジェクトに変換する。
 * - 変換に成功した場合
 *   `{success: true, data: <パースしたデータ>}`の形式で結果を返す
 * - 返還に失敗した場合
 *   `{success: false, error: <エラー内容>}`の形式で結果を返す
 * @param {string} json オブジェクトに変換するJSON文字列
 * @returns JSON文字列のオブジェクトへの変換結果
 */
export function parseJson(json) {
  try {
    const obj = JSON.parse(json);
    return {success: true, data: obj};
  } catch(e) {
    return {success: false, error: e};
  }
}