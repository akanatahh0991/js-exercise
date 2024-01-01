

class Example {

  /**
   * Exampleのコンストラクタ。
   * numに指定不可な値が代入された場合は、RangeErrorがthrowされる。
   * @param {number} num 練習番号。1~99まで指定可能。
   */
  constructor(num) {
    if (!Number.isInteger(num) || 0 > num || num > 99) {
      throw RangeError(`num is invalid: ${num}`)
    }
    this.num = num;
  }

  valueOf() {
    console.log("call valueOf!");
    return this.num;
  }

  toString() {
    console.log("call toString!");
    return `ex${this.num}`;
  }
}

const example = new Example(13);

console.log("valueOf: ch03 > [" + example + "]")
console.log(`toString: ch03 > ${example}`);
