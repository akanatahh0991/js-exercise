function makeFixedSizeArray(size) {
  const array = new Array(size);
  return {
    get(index) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      return array[index];
    },
    set(index, value) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      array[index] = value;
    },
    length() {
      return array.length;
    },
  };
}

export class DynamicSizeArray {
  static INITIAL_SIZE = 4; // 初期サイズ

  constructor() {
    this.len = 0;
    this.array = makeFixedSizeArray(DynamicSizeArray.INITIAL_SIZE);
  }

  get(index) {
    try {
      return this.array[index];
    } catch(e) {
      return undefined;
    }
  }

  set(index, value) {
    // indexが配列に格納できるサイズでない場合は配列を拡大する。
    const rate = Math.ceil(Math.log2((index + 1) / this.array.length()))
    if (rate >= 1) {
      // 新しい固定長配列を作成して要素をコピー
      const old = this.array;
      this.array = makeFixedSizeArray(old.length() * (2 ** rate));
      for(let i = 0; i < old.length(); i++) {
        this.array[i] = old[i];
      }
    }
    if (this.len < index + 1) {
      this.len = index + 1;
    }
    this.array[index] = value;
  }

  length() {
    return this.len;
  }

  push(value) {
    // this.array に空が無い場合は「再配置」を行う
    if (this.len >= this.array.length()) {
      // 新しい固定長配列を作成して要素をコピー
      const old = this.array;
      this.array = makeFixedSizeArray(old.length() * 2);
      for(let i = 0; i < old.length(); i++) {
        this.array[i] = old[i];
      }
    }
    this.array[this.len] = value;
    this.len++
  }
}