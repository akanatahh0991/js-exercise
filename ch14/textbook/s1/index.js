/**
 * ## 14.1 プロパティ属性
 * - writable
 * 書き込み可否
 * - enumerable
 * for/inおよびObject.keysの列挙可能性
 * - configurable
 * プロパティの変更、削除可否
 * 
 * プロパティは２つに分類できる
 * - データプロパティ
 * value, writable, enumerable, configurableをもつ
 * - アクセサプロパティ
 * getter/setter, enumerable, configurableをもつ
 * 
 * ### PropertyDescripter
 * プロパティ属性の取得/設定用のオブジェクト。
 * - `Object.getOwnPropertyDescripter`
 * プロパティ属性の取得
 * - `Object.defineProperty`
 * プロパティ属性の変更。新しいプロパティを作成している場合、省略した属性はfalse/undefinedになる。
 * 
 * 一度に複数プロパティを変更する場合は、`Object.defineProperties`を使う。
 * また、`Object.create`の第二引数は、`Object.defineProperties`の第二引数と同様に設定できる。
 */

console.log(Object.getOwnPropertyDescriptor({x: 1}, "x"));
// { value: 1, writable: true, enumerable: true, configurable: true }


const random = {
    get octet() { return Math.floor(Math.random()*256)}
}
console.log(Object.getOwnPropertyDescriptor(random, "octet"));
//  {
//     get: [Function: get octet],
//     set: undefined,
//     enumerable: true,
//     configurable: true
//   }

const o = {};
Object.defineProperty(o, "x", {
    value: 1,
    writable: true,
    enumerable: false,
    configurable: true
});

console.log(o.x); // 1
console.log(Object.keys(o)); // [] <- enumerableがfalseだから

Object.defineProperty(o, "x", { writable: false});
// o.x = 2; // TypeErrorがthrowされる

const p = Object.defineProperties({}, {
    x: { value: 1, writable: true, enumerable: true, configurable: true },
    y: { value: 1, writable: true, enumerable: true, configurable: true },
    r: {
        get() { return Math.sqrt(this.x*this.x + this.y*this.y); },
        enumerable: true,
        configurable: true
    }
});

/*
 * 新たにObject.assignDescriptors()関数を定義する。
 * この関数は、Object.assign()と同じような動作を行う。
 * ただし、単にプロパティ値をコピーするのではなく、
 * コピー元からコピー先へプロパティディスクリプタを
 * コピーする。この関数は、列挙可のプロパティも列挙不可の
 * プロパティも独自プロパティであればすべてコピーする。
 * また、ディスクリプタをコピーするので、ゲッター関数や
 * セッター関数の場合は、コピー元からコピー先へ関数をコピーする。
 *
 * Object.assignDescriptors()は、Object.defineProperty()から
 * スローされたすべてのTypeErrorを伝播する。コピー先のオブジェクトが
 * 封印や凍結されていたりする場合や、コピー元のプロパティでコピー先の
 * 再定義不可のプロパティを変更しようとした場合に、このエラーがスローされる。
 *
 * assignDescriptorsプロパティは、Object.defineProperty()を使って
 * Objectに追加される。このようにすることで、Object.assign()のように
 * 列挙不可のプロパティとして作成できる。
 */
Object.defineProperty(Object, "assignDescriptors", {
    // Object.assign()の属性と同じにする。
    writable: true,
    enumerable: false,
    configurable: true,
    // この関数がassignDescriptorsプロパティの値になる。
    value: function(target, ...sources) {
        for(const source of sources) {
            for(const name of Object.getOwnPropertyNames(source)) {
                const desc = Object.getOwnPropertyDescriptor(source, name);
                Object.defineProperty(target, name, desc);
            }

            for(const symbol of Object.getOwnPropertySymbols(source)) {
                const desc = Object.getOwnPropertyDescriptor(source, symbol);
                Object.defineProperty(target, symbol, desc);
            }
        }
        return target;
    }
});

