const tensquared = (function(x) { return x*x}(10));
console.log(tensquared);

const f = () => {
  console.log(this);
}
f();