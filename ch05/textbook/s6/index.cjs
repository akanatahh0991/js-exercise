
const obj = {name: "Taro", age: 17};
with(obj) {
  name = "Kaori";
  age = 18;
  sex = 'female' // オブジェクトに追加されない
}

console.log(obj); // { name: 'Kaori', age: 18}

function multiplyby10(num) {
  if (num === undefined) {
    debugger;
    throw new RangeError("num is needed")
  }
  return num * 10
}

multiplyby10(90);

function useStrictFunc(name, age) {
  "use strict";
  console.log(arguments[1]);
  arguments[1] = 58;
  console.log(age); // 非Strictでは58, Strictでは56になる
}

useStrictFunc("Akira", 56);

