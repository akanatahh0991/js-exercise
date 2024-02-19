function Person(name, age) {
  this.name = name;
  this.age = age;
}

console.log(Person.prototype); // nullじゃない
const taro = new Person("taro", 23);
console.log(taro.__proto__ === Person.prototype); // true

const o1 = Object.create({x: 1, y: 2});
console.log(o1.x, o1.y);

const original = { x: 3, y: 5};
const o2 = { ...original };
console.log(o2);

const book = {
  author: { name: 'Yumi'},
  'main title': 'Good JavaScript Code',
  edition: 7,
};

console.log(book.author.name, book['main title'], book.edition);

const o3 = Object.create(original);
o3.x = 4;
o3;