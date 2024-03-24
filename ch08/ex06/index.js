const m = function (...arg) {
  console.log(arg[1]);
};
m("a", "b");

const mArrow = (...arg) => {
  console.log(arg[1]);
};
mArrow("a", "b");