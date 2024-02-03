
/**
 * 完全週休２日制で休日の場合はtrueを返す。
 * @param {string} japaneseDay "月","火","水","木","金","土","日"のいずれかの文字列
 * @throws {RangeError} 引数に"月","火","水","木","金","土","日"以外の文字列を指定した場合にthrowされる。
 */
export function isHoliday1(japaneseDay) {
  if (!["月", "火", "水", "木", "金", "土", "日"].includes(japaneseDay)) {
    throw new RangeError("invalid japaneseDay: " + japaneseDay);
  }
  if (japaneseDay === "土" || japaneseDay === "日") {
    return true
  }
  return false
}

/**
 * 完全週休２日制で休日の場合はtrueを返す。
 * @param {string} japaneseDay "月","火","水","木","金","土","日"のいずれかの文字列
 * @throws {RangeError} 引数に"月","火","水","木","金","土","日"以外の文字列を指定した場合にthrowされる。
 */
export function isHoliday2(japaneseDay) {
  switch(japaneseDay) {
    case "月":
    case "火":
    case "水":
    case "木":
    case "金":
      return false;
    case "土":
    case "日":
      return true;
    default:
      throw new RangeError("invalid japaneseDay: " + japaneseDay);
  }
}
