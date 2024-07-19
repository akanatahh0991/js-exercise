/**
 * ## 14.4 well-known Symbol
 * `Symbol()`ファクトリ関数のプロパティとして保存されている一連のSymbol値。
 * - Symbol.iterator
 * - Symbol.asyncIterator
 * - Symbol.hasInstance
 * `instanceof`演算子の右辺は通常コンストラクタ関数である必要がある。
 * `o instanceof f`は`o`のプロトタイプチェーンの中に`f.prototype`があるかどうかで評価される。
 * ただし、ES6では`instanceof`の右辺が[Symbol.hasInstance]メソッドを持つ場合、左辺の値を引数にしてこのメソッドで評価される。
 */
const uint8 = {
    [Symbol.hasInstance](x) {
        return Number.isInteger(x) && x >= 0 && x <= 255;
    }
}

console.log(128 instanceof uint8); // true
console.log(256 instanceof uint8); // false
console.log(Math.PI instanceof uint8); // false
/**
 * - Symbol.toStringTag
 * `Object.prototype.toString.call(o)`とすると、"[Object oのクラス属性]"と表示される。
 * ただし、oのクラス属性と表示されるのは標準で用意されているクラスのみで、独自定義したクラスは"[Object Object]"と表示される。
 * `Symbol.toStringTag`メソッドを用意すると、独自定義したクラスも"[Object クラス属性]"と表示されるようになる。
 */
function classof(o) {
    // [Object ??]の[Object までと最後の]を削除することでクラス属性を取得できる。
    return Object.prototype.toString.call(o).slice(8, -1);
}

console.log(classof(1));
console.log(classof(null));
console.log(classof(""));
console.log(classof([]));
console.log(classof(/./));
console.log(classof(new Date()));
console.log(classof(new Date()));
class Range {
    get [Symbol.toStringTag]() { return 'Range'}
}
console.log(classof(new Range()));

// 出力結果
// Number
// Null
// String
// Array
// RegExp
// Date
// Date
// Range

/**
 * - Symbole.species
 * `Array`のような組み込みクラスを継承したクラスで`map`、`filter`などのメソッドを使う場合、通常サブクラスが返される。
 * これは下記のメカニズムによるものである。
 * 1. ES6以降では`Array`コンストラクタは`Symbol.species`メソッドを持ち、`this`を返している。
 * 2. extendsを使ってサブクラスを作ると、サブクラスのコンストラクタはスーパクラスのコンストラクタのプロパティを継承する。つまり、`Symbol.species`メソッドも継承する。
 * 3. `map`, `filter`関数は新しい配列を作成する際に`new this.constructor[Symbol.species]`を呼び出す。
 * 
 * `Symbole.species`メソッドは書き込み不可なので、インスタンス生成後に変更する場合は`Object.defineProperty`を使用すること。
 */

// 最初と最後の要素のゲッターを追加したArrayクラスのサブクラス。
class EZArray extends Array {
    static get [Symbol.species]() { return Array; }
    get first() { return this[0]; }
    get last() { return this[this.length-1]; }
}

const e = new EZArray(1,2,3);
const f = e.map(x => x - 1);
console.log(e.last) // => 3
console.log(f.last) // => undefined: fは通常の配列なので、lastゲッターは存在しない。

// static get [Symbol.species]を定義せずにインスタンス生成後に変更する場合
// Object.defineProperty(EZArray, Symbol.species, {value: Array});

/**
 * - Symbol.isConcatSpreadable
 * `Array.prototype.concat`を使用する場合、配列要素は展開されて追加され、それ以外は要素として追加した新しい配列を返す。
 * 以下の場合は、`Symbol.isConcatSpreadable`を使うことで上記の振る舞いを変更できる。
 * 1. 配列のようなオブジェクトを作成して、その要素を展開して追加したい場合
 */

const arraylike = {
    length: 1,
    0: 1,
    [Symbol.isConcatSpreadable]: true
};
console.log([].concat(arraylike)) // => [1]: （展開しない場合は[[1]]になる）。
/**
 * 2. 配列のサブクラスで展開せずにconcatで追加したい場合
 */
class NonSpreadableArray extends Array {
    get [Symbol.isConcatSpreadable]() { return false; }
}
const a = new NonSpreadableArray(1,2,3);
console.log([].concat(a).length) // => 1; （aが展開されていれば、長さは3になっていたはず）。

/**
 * - パターンマッチング用のSymbol
 * パターンマッチングを行うStringのメソッドに対応したSymbol（Symbol.match, Symbol.search）などがある。
 */

class Glob {
    constructor(glob) {
        this.glob = glob;

        // 内部的には正規表現を使ってグロブを実装する。
        // ?は/以外の1文字にマッチする。*は/以外の0個以上の文字にマッチする。
        // それぞれの文字をキャプチャグループに置き換える。
        const regexpText = glob.replace("?", "([^/])").replace("*", "([^/]*)");

        // uフラグをつけてUnicodeを考慮したマッチングを行う。
        // グロブは文字列全体にマッチさせることを意図して
        // いるので、^と$アンカーを使う。また、グロブでは
        // あまり意味がないので、search()やmatchAll()は実装しない。
        this.regexp = new RegExp(`^${regexpText}$`, "u");
    }

    toString() { return this.glob; }

    [Symbol.search](s) { return s.search(this.regexp); }
    [Symbol.match](s) { return s.match(this.regexp); }
    [Symbol.replace](s, replacement) {
        return s.replace(this.regexp, replacement);
    }
}

const pattern = new Glob("docs/*.txt");
"docs/js.txt".search(pattern) // => 0: 0文字目から一致する。
"docs/js.htm".search(pattern) // => -1: 一致しない。
const match = "docs/js.txt".match(pattern);
match[0]    // => "docs/js.txt"
match[1]    // => "js"
match.index // => 0
"docs/js.txt".replace(pattern, "web/$1.htm") // => "web/js.htm"

/**
 * - Symbol.toPrimitive
 * オブジェクトを基本型に変換するアルゴリズムを制御できる。
 * 
 * 一般にオブジェクトを基本型に変換するアルゴリズムは以下の３つ
 * 1. 文字列が期待される場面
 * オブジェクトの`toString`を呼び出す。`toString`が未定義または基本型を返さない場合は`valueOf`を呼び出す。
 * 2. 数値が期待される場面
 * オブジェクトの`valueOf`を呼び出す。`valueOf`が未定義または基本型を返さない場合は`toString`を呼び出す。
 * 3. 文字列でも数値でもどちらでもいい場面
 * クラス側で変換方法を決める。`Date`では`toString`、他の型では`valueOf`がまず呼ばれる。
 */

// Symbol.toPrimitive プロパティを持つオブジェクト。
const obj2 = {
    [Symbol.toPrimitive](hint) {
      if (hint == "number") {
        return 10;
      }
      if (hint == "string") {
        return "hello";
      }
      return true;
    },
  };
  console.log(+obj2); // 10        -- hint は "number"
  console.log(`${obj2}`); // "hello"   -- hint は "string"
  console.log(obj2 + ""); // "true"    -- hint は "default"

  /**
   * - Symbol.unscopables
   * 非推奨となった`with`の対象から外すために使用する。
   * 
   * with(Array.prototype) {keys.push('test')}みたいなコードでエラーになる互換性の問題を防ぐために導入された。
   */
  const newArrayMethods = Object.keys(Array.prototype[Symbol.unscopables]);
  console.log(newArrayMethods)

  // 出力結果
  // これらのメソッドはwithで扱えない。
//   [
//     'copyWithin', 'entries',
//     'fill',       'find',
//     'findIndex',  'flat',
//     'flatMap',    'includes',
//     'keys',       'values',
//     'at'
//   ]