let o = { x: 1, y: 2, z: 3};
let keys = "";
for (let k of Object.keys(o)) {
  keys += k;
}
console.log(keys);

let sum = 0;
for (let v of Object.values(o)) {
  sum += v;
}
console.log(sum);

let pairs = "";

for(const [k, v] of Object.entries(o)) {
  pairs += k + v;
}
console.log(pairs);

const text = "Na na na na na na na na Batman!";
const wordSet = new Set(text.split(" "));
const unique = [];
for (const w of wordSet) {
  unique.push(w);
}
console.log(unique);

o = null
let a = [], i = 0;
for(a[i++] in o);
console.log(a);