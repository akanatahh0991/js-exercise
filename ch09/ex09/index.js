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

/**
 * オープンクローズドの原則に反した面積を計算するクラス
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

export 