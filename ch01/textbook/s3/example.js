let a = [];
a.push(1, 2, 3);
console.log("push" + a);
a.reverse();
console.log("reverse" + a);
const points = [
  { x: 0, y: 0 },
  { x: 1, y: 1 },
];
points.dist = function () {
  const p1 = this[0];
  const p2 = this[1];
  const a = p2.x - p1.x;
  const b = p2.y - p2.y;
  return Math.sqrt(a * a + b * b);
};
console.log(points.dist());
// const distFunc = points.dist;
// console.log(distFunc()); // これはエラーになる。thisがグローバルオブジェクトになるため。

function abs(x) {
  if (x >= 0) {
    return x;
  } else {
    return -x;
  }
}

console.log(abs(-10) === abs(10));

let primes = [2, 3, 5, 7];
primes[4] = 9;
primes[4] = 11;

function sum(array) {
  let sum = 0;
  for (let x of array) {
    sum += x;
  }
  return sum;
}
console.log("sum: " + sum(primes));

function factorial(n) {
  let product = 1;
  while (n > 1) {
    product *= n;
    n--;
  }
  return product;
}
console.log("factorial: " + factorial(4));

function factorial2(n) {
  let i,
    product = 1;
  for (i = 2; i <= n; i++) product *= i;
  return product;
}

console.log("factorial2: " + factorial2(5));

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  distance() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

const p = new Point(1, 1);
console.log("Point distance: " + p.distance());
