/**
 * 3-1  "パン"を Unicode エスケープシーケンスで記述した文字列リテラルを NFC と NFD のそれぞれの形式で作ってください。
 */
const bread = "パン";
const nfc = bread
  .normalize("NFC")
  .split("")
  .map((char) => `\\u${char.charCodeAt(0).toString(16)}`)
  .join("");
const nfd = bread
  .normalize("NFD")
  .split("")
  .map((char) => `\\u${char.charCodeAt(0).toString(16)}`)
  .join("");
console.log(`パン [nfc: ${nfc}, nfd: ${nfd}]`);
