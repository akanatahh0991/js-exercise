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
