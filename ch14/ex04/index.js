/**
 * ひらがな１文字を表すクラス。
 */
export class Hiragana {
    
    /**
     * `Hiragana`のコンストラクタ。
     * @param {string} char ひらがな１文字
     * @throws {TypeError} `char`が1文字でない場合およびひらがなではない文字列が指定されている場合
     */
    constructor(char) {
        if (char.length !== 1) {
            throw new TypeError(`invalid char length: ${char.length}`)
        }
        const codePoint = char.codePointAt(0);
        if (codePoint < 0x3040 || codePoint > 0x309F) {
            throw new TypeError(`char is not Hiragana: char codePoint is ${codePoint}`)
        }
        this.char = char;
        this.codePoint = codePoint;
    }

    [Symbol.toPrimitive](hint) {
        if (hint === 'number') {
            return this.codePoint;
        }
        if (hint === 'string') {
            return this.char;
        }
        return this.codePoint;
    }
    
}