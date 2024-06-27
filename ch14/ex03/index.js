/**
 * 合成可能なダイアクリティカルマークを取り除いてパターンマッチングするクラス。
 * このクラスを使用した場合、合成可能なダイアクリティカルマークは取り除かれて結果が返されます。
 */
export class IgnoreAccentPattern {

    constructor(pattern) {
        if (pattern instanceof RegExp) {
            this.regexp = new RegExp(this._ignoreAccent(pattern.source), pattern.flags)
        } else if (typeof pattern === 'string') {
            this.regexp = new RegExp(this._ignoreAccent(pattern));
        } else {
            throw new TypeError(`invalid pattern type: ${pattern}`)
        }
    }

    [Symbol.search](s) {
        return this._ignoreAccent(s).search(this.regexp)
    }

    [Symbol.match](s) {
        return this._ignoreAccent(s).match(this.regexp);
    }

    _ignoreAccent(text) {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
}