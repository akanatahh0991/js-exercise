
/**
 * 文字列中の大文字・小文字("つ"と"っ"等)、濁点・半濁点("は"と"ば"と"ば"等)の違いを無視してソートする
 * @param {[string]} texts 日本語文字列の配列
 * @returns {[string]} ソート済の文字列配列
 */
export function sortJapanese(texts) {
    const japaneseOrder = new Intl.Collator(
        'ja-JP-u-ca-japanese',
        {
            sensitivity: "base",
            ignorePunctuation: true
        }
    ).compare
    return texts.sort(japaneseOrder);
}

/**
 * `(和暦)y年m月d日` のフォーマットで日付の文字列を返す
 * @param {Date} date
 * @returns `(和暦)y年m月d日` のフォーマットで表示された日付
 */
export function toJapaneseDateString(date) {
    return Intl.DateTimeFormat(
        'ja-JP-u-ca-japanese', 
        {era: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    ).format(date)
}