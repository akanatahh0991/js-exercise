// const pattern = /s$/i;
// const pattern = new RegExp("s$", "i")
// $は文字列の最後を表すメタ文字
// iは大文字小文字を区別しないことを表すメタ文字

const reg = new RegExp("\\ start");
const result = reg.exec("test \\ start end \\ testt");
console.log(result);

console.log("\\")

// searchは最初に見つかった文字列の先頭の位置を返す。無い場合は-1。
const searchResult1 = "JavaScript".search(/script/ui);
const searchResult2 = "Python".search(/script/ui);
console.log(searchResult1, searchResult2); // 4, -1

const replaceResult1 = `javascript is one of the very good programming languages.
javascript is prototype base and object-orientation programming language. TypeScript is super set of javaScript.`
.replace(/javascript/gi, 'JavaScript');

console.log(replaceResult1); // すべてJavaScriptに置き換わる。

const quote = /"([^"]*)"/g;
const replaceResult2 = 'He said "stop".'.replace(quote, '<<$1>>');
console.log(replaceResult2); // He said <<stop>>.

// 名前付きキャプチャを使用
const quote2 = /"(?<quotedText>[^"]*)"/g
const replaceResult3 = 'He said "stop".'.replace(quote2, '<<$<quotedText>>>');
console.log(replaceResult3); // He said <<stop>>.

const s = "15 times 15 is 225";
const replaceResult4 = s.replace(/\d+/gu, n => parseInt(n).toString(16));
console.log(replaceResult4); // f times f is e1

const matchResult1 = "7 plus 8 equals 15".match(/\d+/g);
console.log(matchResult1); // ['7', '8', '15']

const url = /(\w+):\/\/([\w.]+)\/(\S*)/;
const text = "Visit my blog at http://www.example.com/~david";
const match = text.match(url);
console.log(match);
// [
//     'http://www.example.com/~david', //全体
//     'http', // $1の内容
//     'www.example.com', // $2の内容
//     '~david', //$3の内容
//     index: 17,
//     input: 'Visit my blog at http://www.example.com/~david',
//     groups: undefined
//   ]

const url2 = /(?<protocol>\w+):\/\/(?<host>[\w.]+)\/(?<path>\S*)/;
const text2 = "Visit my blog at http://www.example.com/~david";
const match2 = text2.match(url2);
console.log(match2);
// [
//     'http://www.example.com/~david',
//     'http',
//     'www.example.com',
//     '~david',
//     index: 17,
//     input: 'Visit my blog at http://www.example.com/~david',
//     groups: [Object: null prototype] {
//       protocol: 'http',
//       host: 'www.example.com',
//       path: '~david'
//     }
//   ]

const vowel = /[aeiou]/y;
const vowelResult1 = "test".match(vowel);
console.log(vowel.lastIndex); // 0
console.log(vowelResult1); // null
vowel.lastIndex = 1;
const vowelResult2 = "test".match(vowel); 
console.log(vowelResult2); // [ 'e', index: 1, input: 'test', groups: undefined ]
console.log(vowel.lastIndex); // 2
const vowelResult3 = "test".match(vowel);
console.log(vowelResult3); // null
console.log(vowel.lastIndex); // 0

// const words = /\b\p{Alphabetic}+\b/gu;
// for (const word of "This is a native test of the matchAll() methods.".matchAll(words)) {
//     console.log(word);
// }

// [
//     'This',
//     index: 0,
//     input: 'This is a native test of the matchAll() methods.',
//     groups: undefined
//   ]
//   [
//     'is',
//     index: 5,
//     input: 'This is a native test of the matchAll() methods.',
//     groups: undefined
//   ]
//   [
//     'a',
//     index: 8,
//     input: 'This is a native test of the matchAll() methods.',
//     groups: undefined
//   ]
//   [
//     'native',
//     index: 10,
//     input: 'This is a native test of the matchAll() methods.',
//     groups: undefined
//   ]
//   [
//     'test',
//     index: 17,
//     input: 'This is a native test of the matchAll() methods.',
//     groups: undefined
//   ]
//   [
//     'of',
//     index: 22,
//     input: 'This is a native test of the matchAll() methods.',
//     groups: undefined
//   ]
//   [
//     'the',
//     index: 25,
//     input: 'This is a native test of the matchAll() methods.',
//     groups: undefined
//   ]
//   [
//     'matchAll',
//     index: 29,
//     input: 'This is a native test of the matchAll() methods.',
//     groups: undefined
//   ]
//   [
//     'methods',
//     index: 40,
//     input: 'This is a native test of the matchAll() methods.',
//     groups: undefined
//   ]

const arry = "123,456,789".split(',');
console.log(arry); // [ '123', '456', '789' ]

const nArray = "1, 2, 3, \n4, 5".split(/\s*,\s*/);
console.log(nArray) // 改行であってもヒット。[ '1', '2', '3', '4', '5' ]

const htmlTag = /<([^>]+)>/
const htmlTagResult = "Testing<br/>1, 2, 3".split(htmlTag);
console.log(htmlTagResult); // キャプチャグループもヒット。 [ 'Testing', 'br/', '1, 2, 3' ]

// 文字列の中でエスケープシーケンスとして\\とする必要がある。
// const zipcode = new RegExp("\\d{5}", "g")

const pattern = /Java/g;
const execText = "JavaScript > Java";
let tempMatch;
while((tempMatch = pattern.exec(execText)) !== null) {
    console.log(`Matched ${tempMatch[0]} at ${tempMatch.index}`)
    console.log(`Next search begins at ${pattern.lastIndex}`)
}

