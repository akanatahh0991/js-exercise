const arry = [[2, 3, 4], [5, 6, 7]];

arry.forEach((vector) => {
  delete vector[2];
})

console.log(arry); // [[1, 2, <empty>], [5, 6, <empty>]]

const a = [1, 2, 3, 4, 5];

const sum = a.reduce((x, y) => {
  console.log(`resucing: x=${x}, y=${y}`)
  return x + y
})

const product = a.reduce((x, y) => {
  return x * y
})

console.log(product);

const b = [1, [2, [3, [4]]]];
const c = b.flat(5);
console.log(c);

const n = 4;
const nArry = new Array(n).fill(0).map((_, index) => index + 1);

console.log(nArry);

const arry3 = [1, 2, 3, 4, 5];
arry3.length = 2;
console.log(arry3); // [1, 2]
arry3.length = 5;
console.log(arry3) // [ 1, 2, <3 empty items> ]
arry3.length = 6;
console.log(arry3); // [ 1, 2, <4 empty items> ]

const text = "\u{1f476}\u{200d}\u{1f467}";
console.log(text, text.length);