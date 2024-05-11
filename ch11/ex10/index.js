
/**
 * `year`年`month`月の日数を取得する。
 * @param {number} year 年。1970以上100000以下の整数値を指定すること。
 * @param {number} month 月。1から12の整数値を指定すること。
 * @returns `year`年`month`月の日数
 * @throws {TypeError} `year`および`month`に不正値が渡された場合throwされる。
 */
export function getDaysOfMonth(year, month) {
    // Dateの対応する年が環境によって異なる。(多くは275650)
    if (!Number.isInteger(year) || year < 1970 || year > 100000) {
        throw new TypeError(`invalid year: ${year}`)
    }
    if (!Number.isInteger(month) || month < 1 || month > 12) {
        throw new TypeError(`invalid month: ${month}`)
    }
    return new Date(Date.UTC(year, month, 0)).getDate()
}

/**
 * 期間の開始日と終了日を'YYYY-MM-DD'形式の日付で二つ引数で受け取り、その期間(開始日と終了日を含む)の土日以外の日数を取得する。
 * @param {string} startDate 'YYYY-MM-DD'形式の日付で表された開始年月日
 * @param {string} endDate 'YYYY-MM-DD'形式の日付で表された終了年月日
 * @returns 指定した開始日と終了日を含む土日を除いた日数
 * @throws {TypeError} `startDate`、`endDate`が不正の場合(1969年以前も含む)および開始日が終了日よりも後日になっている場合にthrowされる。
 */
export function getWeekDays(startDate, endDate) {
    const start = parseDateFrom(startDate);
    const end = parseDateFrom(endDate)
    if (start === null || end === null) {
        throw new TypeError(`invalid date: startDate=${startDate}, endDate=${endDate}`);
    }
    if (start > end) {
        throw new TypeError(`startDate(${startDate}) > endDate(${endDate})`);
    }
    let count = 0;
    const date = new Date(start);
    while(date <= end) {
        if (date.getUTCDay() !== 0 && date.getUTCDay() !== 6) {
            count++;
        }
        date.setUTCDate(date.getUTCDate() + 1);
    }
    return count;
}

/**
 * 'YYYY-MM-DD'形式の日付とロケールを引数で受け取り、その日の曜日をロケールの形式の文字列で返す
 * @param {string} date 'YYYY-MM-DD'形式の日付で表された年月日
 * @param {string} locale ロケール
 * @returns `date`の曜日を`locale`で表示したもの
 * @throws {Error} `date`または`locale`が不正値の場合(dateが1969年以前も含む)にthrowされる。
 */
export function getLocaleDay(date, locale) {
    const d = parseDateFrom(date);
    if (d === null) {
        throw new TypeError(`invalid date: ${date}`)
    }
    return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(d)
}

/**
 * ローカルのタイムゾーンにおいて先月 1 日 0 時 0 分 0 秒の Date オブジェクトを返す
 * @param {Date} date 任意のDateオブジェクト
 * @returns 先月 1 日 0 時 0 分 0 秒の Date オブジェクト
 */
export function getFirstDayOfLastMonth(date) {
    const options = { year: 'numeric', month: 'numeric'};
    const nowString = new Intl.DateTimeFormat("es", options).format(date);
    console.log(nowString)
    const regex = /^(\d{1,})\/(\d{1,})/;
    const matchResult = nowString.match(regex);
    const year = parseInt(matchResult[2]);
    const month = parseInt(matchResult[1]);
    console.log(month, year)
    if (month === 1) {
        return new Date(Date.UTC((year - 1), 11, 1, 0, 0, 0))
    } 
    return new Date(Date.UTC(year, (month - 2), 1, 0, 0, 0))
}

/**
 * `yyyymmdd`の表示形式の年月日を`Date`オブジェクトに変換する。
 * 変換できない場合は`null`を返す。
 * @param {string} yyyymmdd YYYY-MM-DDの表示形式の年月日
 * @returns `yyyymmdd`に対応する`Date`オブジェクト。変換できない場合は`null`を返す。
 */
function parseDateFrom(yyyymmdd) {
    const pattern = /^(\d{4})-(\d{2})-(\d{2})$/;
    const result = pattern.exec(yyyymmdd);
    if (result === null || result[1] < 1970) {
        return null;
    }
    const stamp = Date.parse(yyyymmdd);
    if (Number.isNaN(stamp)) {
        return null
    }
    return new Date(stamp);
}