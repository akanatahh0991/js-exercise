// 著作権マーク
console.log("\xA9");
// π
console.log("\u03c0");

console.log("abllcdllefllghll".replace(/ll/g, ""));
console.log("a\r\nbcde\ng".replace(/\r\n/g, "\n"));

const errorMessage = `\
\u2718 Test Failure at 
this point.
`;

console.log(errorMessage)

let person = "Mike";
let age = 28;

function myTag(strings, personExp, ageExp) {
  let str0 = strings[0]; // "That "
  let str1 = strings[1]; // " is a "
  let str2 = strings[2]; // "."

  console.log(strings[0], strings[1], strings[2])

  let ageStr;
  if (ageExp > 99) {
    ageStr = "centenarian";
  } else {
    ageStr = "youngster";
  }

  // テンプレートリテラルを用いて組み立てた文字列を返すこともできます
  return `${str0}${personExp}${str1}${ageStr}${str2}`;
}

let output = myTag`That ${person} is a ${age}.`;

console.log(output);

console.log(typeof null);
console.log(`null == undefined is ${null == undefined}`)

const obj1 = {a: "Test"};
const obj2 = {a: "Test"};
console.log(obj1 === obj2)

/**
 * numberを3倍した値をコンソールに表示します。
 * @param {number} num 
 */
function showTripledNumber(num) {
  const tripledNum = num * 3;
  console.log(tripledNum)
}
showTripledNumber("3"); // 9
showTripledNumber("a"); // NaN
showTripledNumber("three") // NaN

console.log(showTripledNumber);
console.log(showTripledNumber.toString());
const now = new Date();
console.log(now.toString());

const reg = new RegExp("ab+c", "i");
console.log(reg.toString());

let a = 0, b = 0;
console.log(a, b);

const data = ["Apple", "Banana", "Orange", "Melon"]
for (let i = 0, len = data.length; i < len; i++) console.log(data[i]);
for (const datum of data) console.log(datum);

const obj = {
  name: "Mike",
  age: 33,
  hello: () => {
    console.log("Hello!")
  },
  introduce: function() {
    console.log(`My name is ${this.name} and ${this.age} years old.`)
  }
}

for (const property in obj) console.log(property, obj[property]);

obj.introduce();

for (let j = 0; j < 3; j++) {
  var k = j;
}

console.log(k);

// function test() {
//   nonDeclaredVal = "KKKK"
// }

// test();
// console.log(nonDeclaredVal);

// 分割代入
function toPolar(x, y) {
  return [Math.sqrt(x**2 + y**2), Math.atan2(y, x)];
}

const [r, theta] = toPolar(1.0, 1.0);
console.log(`r = ${r}, theta = ${theta}`)

const o = {
  x: 1,
  y: 2,
  z: 3
}
for (const [name, value] of Object.entries(o)) {
  console.log(`${name} : ${value}`)
}

// 数は一致しなくてもいい
let [x, y] = [1, 2, 3];
let [, z, w] = [1, 2, 3];
console.log(`x=${x}, y=${y}, z=${z}, w=${w}`);
