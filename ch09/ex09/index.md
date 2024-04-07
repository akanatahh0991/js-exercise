## SOLID原則
### S - 単一責任の原則（SRP）
> モジュールを変更する理由はたったひとつであるべきである。

言い換えると、「モジュールはたったひとつのアクターに対して責務を負うべきである。」となる。下記`Employee`の`calculateDaily`を経理課、`reportDailyWorkingHours`を人事部門が使うとして、経理課チームの扱う労働時間のルールが変わって始業開始前後30分計1時間を所定労働時間に加える場合、`_regularHours`のロジックが変更となり、`calculateDaily`だけではなく`reportDailyWorkingHours`も変更する必要がある。これはアクターの異なるコードが分割されていないことで発生する。
```javascript
/**
 * 単一責務原則に反している従業員クラス
 */
export class Employee {

    /**
     * `Employee`のコンストラクタ
     * @param {number} hourlyPay 時給
     * @param {number} startTime 開始時間（何時から働いたか）
     * @param {number} endTime 終了時間（何時まで働いたか）
     */
    constructor(hourlyPay, startTime, endTime) {
        this._hourlyPay = hourlyPay;
        this._startTime = startTime;
        this._endTime = endTime;
    }
    
    /**
     * 日給額を計算する
     * @returns {number} 日給額
     */
    calculateDailyPay() {
        return this._hourlyPay * this._regularHours();
    }

    /**
     * 労働時間を計算する
     * @returns {number} 労働時間
     */
    reportDailyWorkingHours() {
        return this._regularHours();
    }

    /**
     * 所定労働時間を算出する
     * @returns 
     */
    _regularHours() {
        return (this._endTime - this._startTime);
    }
}
```
単一責務の原則に則った実装は下記のようになる。
```javascript
/**
 * 報告用の日給を報告するクラス
 */
export class DailyWorkingHoursReporter {
     static report(employeeData) {
        return employeeData.endTime - employeeData.startTime;
     }
}

/**
 * 日給を計算するクラス
 */
export class DailyPayCalculator {
    static calculate(employeeData) {
        return employeeData.hourlyPay * (employeeData.endTime - employeeData.startTime + 1)
    }
}

/**
 * 従業員データを保持するクラス
 */
export class EmployeeData {
    constructor(hourlyPay, startTime, endTime) {
        this._hourlyPay = hourlyPay;
        this._startTime = startTime;
        this._endTime = endTime;
    }

    get hourlyPay() {
        return this._hourlyPay;
    }

    get startTime() {
        return this._startTime;
    }

    get endTime() {
        return this._endTime;
    }
}
```
### O - オープン・クローズドの原則
> ソフトウェアの構成要素は拡張について開いていて、修正に対して閉じていなければならない。

言い換えると、「既存の成果物を変更せずに拡張できるべき」となる。
`AreaCalculator`は新しい`type`として円(circle)が増えた場合に、既に実装済みの`calculate`関数を変更する必要がある。
```javascript
/**
 * 面積を計算するクラス
 */
export class AreaCalculator {
    
    static calculate(type, width, height) {
        switch(type) {
            case "triangle":
                return width * height / 2;
            case "circle":
                // どうする？
        }
    }
}
```
オープンクローズドの原則を守った場合は以下のように実装できる。
```javascript
/**
 * 形を表す抽象クラス。
 * 全てのメソッドをoverrideすること。
 */
export class AbstractShape {

    constructor() {
        if (this.constructor === AbstractShape) {
            throw new Error("cannot instantiate Shape")
        }
    }
    calculate() {
        throw Error("must override calculate")
    }
}

export class Triangle extends AbstractShape {

    constructor(width, height) {
        super();
        this._width = width;
        this._height = height;
    }
    calculate() {
        return this._width * this._height / 2;
    }
}

export class Circle extends AbstractShape {

    constructor(r) {
        super();
        this._r = r;
    }
    calculate() {
        return this._r * Math.PI;
    }
}
```
### L - リスコフの置換原則
> 型のオブジェクトo1の各々に、対応するT型のオブジェクトo2が1つ存在し、Tを使って定義されたプログラムPに対してo2の代わりにo1を使ってもPの振る舞いが変わらない場合、SはTの派生型であると言える。

言い換えると、「サブタイプのオブジェクトはスーパータイプのオブジェクトの仕様に従わなければならない」となる。`Rectangle`を`Square`が継承すると、`width`と`height`のセッターの仕様が満たせなくなる。
```javascript
export class Rectangle {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }

    set width(width) {
        this._width = width;
    }

    set height(height) {
        this._height = height;
    }
}

export class Square extends Rectangle {
    constructor(length) {
        super(length, length);
    }

    // widthとheightのセッターそれぞれあるが、、長さは一緒にする必要がある。
}
```
リスコフの置換原則に則った実装は、`Square`と`Rectangle`の間に親子関係は持たないようにすることである。（共通処理を内部で委譲する実装方法もある。）

### I - インターフェース分離の法則
> 汎用なインターフェースが一つあるよりも、各クライアントに特化したインターフェースがたくさんあった方がよい。
`Activity`が`Fragment`を保持する構成で、`Fragment`が`Activity`の全機能を利用できてしまうと、`Fragment`からは呼ばれるべきでないメソッドも操作できてしまう。
```javascript
export class Activity {
    // この関数はFragmentから呼ばれたい
    navigate(fragment) {

    }
    // この関数はFragmentからは呼ばれたくない
    finish() {

    }
}

export class Fragment {
    constructor(activity) {
        this._activity = activity;
    }

    navigate(fragment) {
        if (fragment !== undefined) {
            this._activity.navigate(fragment)
        } else {
            // finishは呼ばれたくない
            this._activity.finish()
        }

    }
}
```
インターフェース分離の原則に従うと下記のように書ける。
```javascript
export class Navigator {
    navigate(fragment) {
        throw new Error("navigate must override")
    }
}

export class Activity extends Navigator {
    navigate(fragment) {
        // 遷移処理
    }

    finish() {

    }
}

export class Fragment {
    constructor(navigator) {
        this._navigator = navigator;
    }

    navigate(fragment) {
        this._navigator.navigate(fragment)
    }
}
```
### D - 依存性逆転の法則
> 上位モジュールはいかなるものも下位モジュールから持ち込んではならない。双方とも具象ではなく、抽象（インターフェースなど）に依存するべきである
インターフェース分離の法則の例で、`Activity`は`Fragment`を使う側であり、上位のMdであるが、`Fragment`でも`Activity`を使用しており相互に依存している状況となっている。正しい実装例では、`Fragment`は`Navigator`を使用しており、`Activity`を直接参照していない。`Navigator`を`Fragment`以下のパッケージに入れることで下位モジュールから上位モジュールへ直接参照することを防ぐことができる。