const {add, Person} = require('./exporter.cjs');

const result = add(45, 60);
const yumi = new Person("Yumi", 22);
console.log(result, yumi.name, yumi.age);