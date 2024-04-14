> 問題10.3, 10.4で作成したそれぞれのモジュールで、エクスポート元の関数・クラスをエディタのリファクタ機能で名前変更した際、インポート側で名前変更がどう追随されるか確認しなさい。
また、デフォルトエクスポート、名前変更を伴うインポート、再エクスポートについても名前変更時の挙動を確認すること。

## Nodeのモジュール方式
インポート側の変更はない。エクスポート側はインポート側の変更が発生しないように名前変更されてエクスポートされる。
```javascript
const plus = (x, y) => x + y; // add -> plusに変更
class Human { // Person -> Humanに変更
    constructor(name, age) {
        this._name = name;
        this._age = age;
    }
    get name() {
        return this._name;
    }
    get age() {
        return this._age;
    }
}
module.exports = {add: plus, Person: Human}; // 名前付きでエクスポート
```

## ES6のモジュール方式
名前付きエクスポートしている関数をリファクタした場合、インポート側もリファクタ後の名前に変更される。
```javascript
// 名前付きエクスポート
export const plus = (x, y) => { // add -> plusに変更
    return x + y;
}
```
デフォルトのエクスポートの場合は、`default`に格納されるため、インポート側の変更はなし。名前変更を伴うインポートの部分も変更はなし。再エクスポートの場合は名前付きエクスポート同様インポート側もリファクタ後の名前に変更される。