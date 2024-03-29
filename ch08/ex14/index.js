/**
 * `conditions`の中でいずれかが`true`を返せば`true`を返す関数を返す。
 */
export function any(...conditions) {
  return function (...args) {
    return conditions.some((condition) => condition.apply(this, args));
  };
}

/**
 * 次の仕様を満たす関数を返す。
 * - `action`の処理を行い、エラーが発生したら`errorHandler`で処理して結果を返す。
 * - エラーが発生しない場合は、`action`の処理の結果を返す。
 * @param {() => any} action 処理
 * @param {(e: Error) => any} errorHandler エラー処理
 */
export function catching(action, errorHandler) {
  return function(...args) {
    try {
        return action.apply(this, args);
      } catch (e) {
        return errorHandler(e);
      }
  }
}

const isNonZero = any(
  (n) => n > 0,
  (n) => n < 0
);

console.log(isNonZero(0)); // => false
console.log(isNonZero(42)); // => true
console.log(isNonZero(-0.5)); // => true

const safeJsonParse = catching(JSON.parse, (e) => {
  return { error: e.toString() };
});

console.log(safeJsonParse('{"a": 1}')); // => {a: 1}
console.log(safeJsonParse("{Invalid Json}")); // => {error: "SyntaxError: ..."}
