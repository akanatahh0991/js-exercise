const obj = {
  userName: "Yumi",
  age: 23,

  toString() {
    return `{ userName: ${this.userName}, age: ${this.age}}`
  }
}

console.log(`${obj}`)