import { sortJapanese, toJapaneseDateString } from "./index.js";

describe("sortJapanese", () => {
    it.each([
        {
            texts: [],
            result: []
        },
        {
            texts: [""],
            result: [""]
        },
        {
            texts: ["い", "あ"],
            result: ["あ", "い"]
        },
        {
            texts: ["つ", "あ", "づ", "っ"],
            result: ["あ", "つ", "づ", "っ"]
        },
        {
            texts: ["ば", "ぱ", "は", "か"],
            result: ["か", "ば", "ぱ", "は"]
        },
        {
            texts: ["ばう", "ぱあ", "はい"],
            result: ["ぱあ", "はい", "ばう"]
        },
    ])("sortJapanese($texts) -> $result", ({texts, result}) => {
        expect(sortJapanese(texts)).toStrictEqual(result);
    })
});

describe("toJapaneseDateString", () => {
    it.each([
        {
            date: new Date(2024, 4, 10),
            result: '令和6年5月10日'
        },
        {
            date: new Date(2019, 4, 1),
            result: '令和元年5月1日'
        },
        {
            date: new Date(2019, 3, 30),
            result: '平成31年4月30日'
        },
        {
            date: new Date(1989, 0, 9),
            result: '平成元年1月9日'
        },
        {
            date: new Date(1989, 0, 7),
            result: '昭和64年1月7日'
        }
    ])("toJapaneseDataString($date) -> $result", ({date, result}) => {
        expect(toJapaneseDateString(date)).toBe(result);
    })
})