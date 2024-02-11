// let x = 4;
// eval("x = 5");
// eval("let x = 10");
// console.log(x); // 5と表示される。let xがconst xだとエラーになる

const geval = eval;
let x = "global";
let y = "global";

function f() {
  let x = "local";
  eval("x += 'changed';");
  return x;
}

function g() {
  let y = "local";
  geval("y += 'changed'");
  return y;
}

console.log(f(), x);
console.log(g(), y);

// let i, j, k;
// const l = (i = 0, j = 1, k = 2);
// console.log(i, j, k, l); // 0, 1, 2, 2 となる（lには最後に評価した値である2が入る）
