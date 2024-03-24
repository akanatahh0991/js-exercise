/**
 * `f`に`call`相当の`myCall`プロパティを追加する。
 * @param {Function} f 関数
 */
export function addMyCall(f) {
  f["myCall"] = function(thisArgs, ...args) {
    return f.bind(thisArgs, ...args)()
  }
}