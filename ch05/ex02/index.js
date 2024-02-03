


/**
 * textをエスケープ文字列を使った表現に変換します。
 * @param {string} text 
 * @returns textのエスケープ文字列を使った表現
 */
export function convertToEscapeCharFrom1(text) {
  const result = [];
  for (const char of text) {
    if (char === '\0') {
      result.push('\\0');
    } else if (char === '\b') {
      result.push('\\b')
    } else if (char === '\t') {
      result.push('\\t')
    } else if (char === '\n') {
      result.push('\\n')
    } else if (char === '\v') {
      result.push('\\v')
    } else if (char === '\f') {
      result.push('\\f')
    } else if (char === '\r') {
      result.push('\\r')
    } else if (char === "\"") {
      result.push('\\"')
    } else if (char === '\'') {
      result.push("\\'")
    } else if (char === '\\') {
      result.push('\\\\')
    } else {
      result.push(char)
    }
  }
  return result.join('')
}

/**
 * textをエスケープ文字列を使った表現に変換します。
 * @param {string} text 
 * @returns textのエスケープ文字列を使った表現
 */
export function convertToEscapeCharFrom2(text) {
  const result = [];
  for (const char of text) {
    switch(char) {
      case '\0':
        result.push('\\0');
        break;
      case '\b':
        result.push('\\b');
        break;
      case '\t':
        result.push('\\t');
        break;
      case '\n':
        result.push('\\n');
        break;
      case '\v':
        result.push('\\v');
        break;
      case '\f':
        result.push('\\f');
        break;
      case '\r':
        result.push('\\r');
        break;
      case "\"":
        result.push('\\"');
        break;
      case '\'':
        result.push("\\'");
        break;
      case '\\':
        result.push('\\\\');
        break;
      default:
        result.push(char);
    }
  }
  return result.join('')
}