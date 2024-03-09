
// TODO typescriptでIntl.Segmenterにアクセスできずに終わった。確認すること。
/**
 * `text`を反転した文字列を返す。
 * @param {string} text 文字列 
 * @returns {string} `text`を反転した文字列
 */
export function reverse(text) {

  const separatedTexts = []

  let isCombined = false
  for (const char of text) {
    if ( char === "\u{200d}") {
      isCombined = true
    } else {
      if (isCombined) {
        const combinedChar = separatedTexts.pop() + "\u{200d}" + char;
        separatedTexts.push(combinedChar);
      } else {
        separatedTexts.push(char)
      }
      isCombined = false
    }
  }
  console.log(separatedTexts)
  return separatedTexts.reverse().join("");
}

console.log(reverse("家族 👨‍👨‍👧‍👧"))