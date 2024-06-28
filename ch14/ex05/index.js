
/**
 * テンプレートリテラルを受け取り、補間値は型の文字列に変換して展開した文字列を返す。
 * 補間値の変換後の型の文字列は`typeof`の結果と一致する。
 * @param {string[]} strings 
 * @param  {...any} values 
 * @returns 補間値を型の文字列に変換して展開した文字列
 */
export function getTypeText(strings, ...values) {
    const valueTypes = values.map((value) => `${typeof value}`);
    let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < valueTypes.length) {
      result += valueTypes[i];
    }
  }
  return result;
}