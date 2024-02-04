以下のコードを実行した場合、withを使ってオブジェクトアクセスする時間は0.094ms, 通常のアクセスは0.005msとなった。

```javascript
const obj = {
  name: "Yumi",
  age: 23,
  hobby: ["cooking", "running", "reading books"],
};

// 0.094ms
console.time();
with (obj) {
  name;
  age;
  hobby;
  console.timeEnd();
}

// 0.005ms
console.time();
obj.name;
obj.age;
obj.hobby;
console.timeEnd();
```