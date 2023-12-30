const key1 = Symbol("key");
const key2 = Symbol("key");

const obj = {
  [key1]: "value1",
  [key2]: "value2"
}

console.log(obj[key1], obj[key2]); // value1, value2

const key3 = Symbol.for("commonKey");
const key4 = Symbol.for("commonKey");

const obj2 = {
  [key3]: "value3",
  [key4]: "value4"
}

// 同じSymbolインスタンスとなるため、後にセットされたプロパティの値が返る
console.log(obj2[key3], obj2[key4]); // value4, value4