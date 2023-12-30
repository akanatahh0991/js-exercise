const obj = {
  name: 'Mike',
  age: 30,
  job: "System Engineer",
  country: "US",
  introduce: function() {
    console.log(`Hello! My name is ${this.name} and ${this.age} years old.`)
  }
}
const keys = [];
const values = [];
for (const property in obj) {
  keys.push(property);
  values.push(obj[property]);
}

console.log(`obj keys=[${keys}], values=[${values}]`);