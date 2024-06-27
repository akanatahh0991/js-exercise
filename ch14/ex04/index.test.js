import {Hiragana} from './index.js';

describe("Test Hiragana", () => {
    it.each([
        {o: 'あ', num: 0x3042},
        {o: 'ぃ', num: 0x3043},
        {o: 'む', num: 0x3080},
        {o: 'ろ', num: 0x308d},
        {o: 'ん', num: 0x3093},
    ])("toPrimitive hint number: $o => $num", ({o, num}) => {
        const hiragana = new Hiragana(o);
        expect(+hiragana).toBe(num)
    });
    it.each([
        {o: 'あ', str: 'あ'},
        {o: 'ぃ', str: 'ぃ'},
        {o: 'む', str: 'む'},
        {o: 'ろ', str: 'ろ'},
        {o: 'ん', str: 'ん'},
    ])("toPrimitive hint string: $o => $str", ({o, str}) => {
        const hiragana = new Hiragana(o);
        expect(`${hiragana}`).toBe(str)
    });
    it.each([
        {o: 'あ', num: 0x3042},
        {o: 'ぃ', num: 0x3043},
        {o: 'む', num: 0x3080},
        {o: 'ろ', num: 0x308d},
        {o: 'ん', num: 0x3093},
    ])("toPrimitive hint default: $o => $num", ({o, num}) => {
        const hiragana = new Hiragana(o);
        expect(hiragana + "").toBe(num.toString())
    });
})