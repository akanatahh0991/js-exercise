

/**
 * ベースのURLのパスとクエリを修正した文字列を返す
 * @param {object} urlParam - URLの構成要素のオブジェクト
 * @param {string} urlParam.base - ベースのURL
 * @param {[[string,string]]} urlParam.addQuery - 追加するクエリ
 * @param {string} urlParam.path - パス
 * @returns {string} ベースのURLのパスとクエリを修正した文字列
 */
export function modifyUrl({base, addQuery, path}) {
    const url = new URL(base);
    addQuery?.forEach(([k, v]) => {
        url.searchParams.append(k, v)
    });
    if (path !== null && path !== undefined) {
        url.pathname = path
    }
    return url.href;
}