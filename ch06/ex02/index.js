const obj = { name: 'own object', id: 4};
const subObj = Object.create(obj);
console.log(Object.getPrototypeOf(subObj) === obj); // true