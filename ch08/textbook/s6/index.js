let scope = "Global Scope";

function checkscope() {
  let scope = 'local scope';
  function f() { return scope }
  return f
}

let s = checkscope()();
console.log(s);

function addPrivateProperty(o, name, predicate) {
  let value;
  o[`get${name}`] = function() { return value;}
  o[`set${name}`] = function(v) {
    if (predicate && !predicate(v)) {
      throw new TypeError(`set${name}; invalid value ${v}`)
    } else {
      value = v;
    }
  }
}