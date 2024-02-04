const obj = {
  name: "Yumi",
  age: 15
};

with(obj) {
  name = 'Yumi Okada'
}

console.log(obj);