/**
 * string.substring同等の処理をstrに適用した文字列を返します。
 * @param {string} str 対象の文字列
 * @param {number} indexStart 始端のインデックス
 * @param {number} indexEnd 終端のインデックス
 * @returns string.substring同等の処理をstrに適用した文字列
 */
export function substring(str, indexStart, indexEnd) {
  const applyIndexCommonRule = (index) => {
    if (index === undefined) {
      return undefined;
    }
    if (Number.isNaN(index) || index === null) {
      return 0;
    }
    if (index < 0) {
      return 0;
    }
    if (index > str.length) {
      return str.length;
    }
    return Math.floor(index);
  };
  let start = applyIndexCommonRule(indexStart);
  let end = applyIndexCommonRule(indexEnd);
  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = str.length;
  }
  if (start === end) {
    return "";
  }
  const correctedStart = Math.min(start, end);
  const correctedEnd = Math.max(start, end);
  let substring = "";
  for (let i = correctedStart; i < correctedEnd; i++) {
    substring += str[i];
  }
  return substring;
}

/**
 * string.slice同等の処理をstrに適用した文字列を返します。
 * @param {string} str 対象の文字列
 * @param {number} indexStart 始端のインデックス
 * @param {number} indexEnd 終端のインデックス
 * @returns string.slice同等の処理をstrに適用した文字列
 */
export function slice(str, indexStart, indexEnd) {
  const applyIndexCommonRule = (index) => {
    if (index === undefined) {
      return undefined;
    }
    if (Number.isNaN(index) || index === null) {
      return 0;
    }
    if (index < 0) {
      const i = str.length + Math.floor(index);
      if (i < 0) {
        return 0;
      }
      return i;
    }
    if (index > str.length) {
      return str.length;
    }
    return Math.floor(index);
  };
  let start = applyIndexCommonRule(indexStart);
  let end = applyIndexCommonRule(indexEnd);
  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = str.length;
  }
  if (start >= end) {
    return "";
  }
  let slicedString = "";
  for (let i = start; i < end; i++) {
    slicedString += str[i];
  }
  return slicedString;
}

/**
 * string.padStart同等の処理をstrに適用した文字列を返します。
 * @param {string} str 対象の文字列
 * @param {number} targetLength 文字列の延長後の文字列の長さ
 * @param {string} padString 文字列の延長に使用する文字列
 * @returns string.padStart同等の処理をstrに適用した文字列
 */
export function padStart(str, targetLength, padString) {
  if (
    targetLength === null ||
    targetLength === undefined ||
    Number.isNaN(targetLength)
  ) {
    return str;
  }
  if (str.length >= targetLength) {
    return str;
  }
  if (padString === undefined) {
    padString = " ";
  }
  if (padString === null) {
    padStart = "null";
  }
  const fillStrLength = targetLength - str.length;
  return (
    padString.repeat(fillStrLength / padString.length) +
    substring(padString, 0, fillStrLength % padString.length) +
    str
  );
}

/**
 * string.trim同等の処理をstrに適用した文字列を返します。
 * @param {string} str 対象の文字列
 * @returns string.trim同等の処理をstrに適用した文字列
 */
export function trim(str) {
  const excludingStrs = [" ", "\t", "\v", "\f", "\n", "\r"]
  let start = str.length;
  for (let i = 0; i < str.length; i++) {
    if (!excludingStrs.includes(str[i])) {
      start = i;
      break;
    }
  }
  let end = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    if (!excludingStrs.includes(str[i])) {
      end = i + 1;
      break;
    }
  }
  console.log(start ,end)
  return substring(str, start, end);
}