/**
 * text中の改行をLFからCRLFに変更する。
 * @param {string} text 
 * @returns CRLF改行を用いたテキスト
 */
export function convertfromLFtoCRLF(text) {
  return text.replace(/([^\r])\n/g, '$1\r\n')
}

/**
 * text中の改行をCRLFからLFに変更する。
 * @param {string} text 
 * @returns LF改行を用いたテキスト
 */
export function convertfromCRLFtoLF(text) {
  return text.replace(/\r\n/g, '\n')
}

// function convertUnicode(text) {
//   return text
//   .split("")
//   .map((char) => `\\u{${char.charCodeAt(0).toString(16)}}`)
//   .join("")
// }

// おまけ
// LFからCRLFは\r\n->\r\r\nとならないように注意
// console.log(convertUnicode("\r\n"))
// console.log(convertUnicode("\n"))
// console.log(convertUnicode(convertfromLFtoCRLF("a\r\nb\nc\r\nd\ne")))