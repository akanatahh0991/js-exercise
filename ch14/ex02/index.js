export class MyArrayLike {
  /**
   * `MyArrayLike`のコンストラクタ
   * @param {any} args 引数要素
   */
  constructor(...args) {
    if (args.length === 1 && typeof args[0] === 'number') {
      const length = args[0];
      if (length < 0 || length > 2 ** 32 - 1) {
        throw new RangeError('Invalid array length');
      }
      this.length = length;
      for (let i = 0; i < length; i++) {
        this[i] = undefined;
      }
    } else {
      this.length = args.length;
      for (let i = 0; i < args.length; i++) {
        this[i] = args[i];
      }
    }
  }

  *[Symbol.iterator]() {
    let index = 0;
    let value;
    while((value = this[`${index}`]) !== undefined) {
      yield value;
      index++
    }
  }
}

export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }
  static get [Symbol.species]() { return MyArrayLike; }
}
