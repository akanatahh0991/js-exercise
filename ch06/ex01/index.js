export function newHashTable() {

  /**
   * ハッシュ値を生成します。
   * @param {string} key 
   */
  const hash = function(key) {
    //TODO ハッシュ値のロジック
    let hashValue = 0;
    for (const char of key) {
      hashValue += char.charCodeAt(0);
    }
    return hashValue;
  }
  return {
    size: 0, // マッピング数を示すプロパティ
    entries:[], // マッピングを格納する配列
    /**
     * keyにマッピングされた値を取得します。
     * keyにマッピングされた値が無い場合は`undefined`を返します。
     * @param {string} key キーを表す文字列。`null`や`undefined`以外を指定すること。
     * @returns keyにマッピングされた値。無い場合は`undefined`を返す。
     * @throws {RangeError} `key`に`null`や`undefined`を指定するとthrowされる。
     */
    get(key) {
      if (key === null || key === undefined) {
        throw new RangeError("key is null or invalid");
      }
      const hashKey = hash(key);
      const headNode = this.entries[hashKey];
      if (headNode === undefined) {
        return undefined; 
      }
      if (headNode.key === key) {
        return headNode.value;
      }
      let currentNode = this.headNode;
      while(currentNode.next !== null) {
        currentNode = currentNode.next;
        if (currentNode.key === key) {
          return currentNode.value;
        }
      }
      return undefined;
    },
    /**
     * `key`, `value`のマッピングを追加します。
     * `key`が存在する場合は、`value`を上書きします。
     * @param {string} key キーを表す文字列。`null`や`undefined`以外を指定すること。
     * @param {any} value 値。`null`や`undefined`以外を指定すること。
     * @throws {RangeError} `key`や`value`に`null`や`undefined`を指定するとthrowされる。
     */
    put(key, value) {
      if (key === null || key === undefined) {
        throw new RangeError("key is null or invalid");
      }
      if (value === null || value === undefined) {
        throw new RangeError("value is null or invalid");
      }
      const hashKey = hash(key);
      const headNode = this.entries[hashKey];
      if (headNode === undefined) {
        this.entries[hashKey] = {
          key,
          value,
          next: null
        }
        this.size++;
        return;
      } 

      if (headNode.key === key) {
        headNode.value = value;
      } else {
        let currentNode = headNode;
        while(currentNode.next !== null) {
          currentNode = currentNode.next;
          if (currentNode.key === key) {
            // valueを上書きしてreturnする。
            currentNode.value = value;
            return;
          }
        }
        // 最後のNodeに追加する
        currentNode.next = {
          key,
          value,
          next: null
        }
        this.size++
      }
    },
    /**
     * keyのマッピングを削除します。
     * keyに対応するマッピングがない場合は何もしません。
     * @param {string} key キーを表す文字列。`null`や`undefined`以外を指定すること。
     * @throws {RangeError} `key`や`value`に`null`や`undefined`を指定するとthrowされる。
     */
    remove(key) {
      if (key === null || key === undefined) {
        throw new RangeError("key is null or invalid");
      }
      const hashKey = hash(key);
      const headNode = this.entries[hashKey];
      if (headNode === undefined) {
        return;
      }
      if (headNode.key === key) {
        // 要素が一つしかない場合はentriesから削除、そうでないならば次の要素をentriesにセットする。
        if (headNode.next === null) {
          this.entries[hashKey] = undefined;
        } else {
          this.entries[hashKey] = headNode.next;
        }
        this.size--;
      } else {
        let currentNode = headNode;
        let prevNode = null;
        while(currentNode.next !== null) {
          prevNode = currentNode;
          currentNode = currentNode.next;
          if (currentNode.key === key) {
            // 削除対象のNodeの前のNodeのnextに次のNodeを設定してreturnする。
            prevNode.next = currentNode.next;
            this.size--;
            return;
          }
        }
      }
    },
  };
}

function sample() {
  const hashTable = newHashTable();
  hashTable.put("key1", "value1");
  hashTable.put("key2", { value: "value2" });

  console.log(`size=${hashTable.size}`); // => size=2
  console.log(`key1=${hashTable.get("key1")}`); // => key1=value1
  console.log(`key2=${JSON.stringify(hashTable.get("key2"))}`); // => key2={"value":"value2"}

  hashTable.put("key2", "new value");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=new value

  hashTable.remove("key2");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=undefined
  console.log(`size=${hashTable.size}`); // => size=1
}

sample()