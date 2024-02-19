const original = {
  _x: 4,
  _y: 5,
  set xValue(value) {
    console.log(`set x is called: value=${value}`)
    this._x = value;
  },
  get xValue() {
    console.log(`get x is called`)
    return this._x;
  }
}

const newObj = Object.create(original);

for ( const prop in newObj) {
  console.log(prop, typeof prop, newObj[prop]);
}

// newObj.x = 6;

// console.log(newObj.x, original.x); //6, 4

let o = { x: 1};
console.log(`o.propertyIsEnumerable('x')=${o.propertyIsEnumerable('x')}`); // true
console.log(`Object.prototype.propertyIsEnumerable("toString")=${Object.prototype.propertyIsEnumerable("toString")}`); //false

const key = Symbol("key");
const obj = {
  [key]: 10,
  name: "Kakaka"
}

for (const p in obj) {
  console.log(p);
}

console.log( key in obj);



