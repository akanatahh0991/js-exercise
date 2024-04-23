const pattern = /s$/i;
// const pattern = new RegExp("s$", "i")
// $は文字列の最後を表すメタ文字
// iは大文字小文字を区別しないことを表すメタ文字

const reg = new RegExp("\\ start");
const result = reg.exec("test \\ start end \\ testt");
console.log(result);

console.log("\\")