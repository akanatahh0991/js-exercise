const a = [1, 2, 3, 4, 5];
a.length = 0;
a.length = 5;
console.log(a);

const b = [1, 2, 3, 4, 5];
delete b[2];
for(const element of b) {
  console.log(element);
}
b.forEach((element) => {
  console.log(element);
})

const result = new Array(5);
for (let i = 0; i < result.length; i++) {
  console.log(result[i]);
}
