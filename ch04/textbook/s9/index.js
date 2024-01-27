console.log("Zoo" > "zoo"); //false 大文字は小文字よりも小さい
console.log("Zooo" > "zoo"); //false 1文字目で比較されることに注意。

console.log("AKB" > "cd"); // false AよりもcのほうがUnicodeが大きいから。

class Example {
  constructor(name) {
    this.name = name;
  }
}

const example = new Example("test");
console.log(typeof example); // object
console.log(example instanceof Object);
const arry = ["Apple", "Banana"];
console.log(typeof arry); // object
