import { getDaysOfMonth, getFirstDayOfLastMonth, getLocaleDay, getWeekDays } from "./index.js";

describe("test getDaysOfMonth", () => {
    it.each([
        {y: 1970, m: 1, result: 31},
        {y: 2003, m: 2, result: 28},
        {y: 2004, m: 2, result: 29},
        {y: 100000, m: 12, result: 31},
    ])("$y/$m is $result days", ({y, m, result}) => {
        expect(getDaysOfMonth(y, m)).toBe(result);
    });
    it.each([
        {y: 1969, m: 12},
        {y: 100001, m: 1},
        {y: 2000, m: 0},
        {y: 2000, m: 13},
        {y: 2000.5, m: 11},
        {y: 2000, m: 11.5}
    ])("invalid param throw error $y/$m", ({y, m}) => {
        expect(() => getDaysOfMonth(y, m)).toThrow();
    })
});

describe("test getWeekDays", () => {
    it.each([
        {start: "2024-05-06", end: "2024-05-10", result: 5},
        {start: "2024-05-05", end: "2024-05-10", result: 5},
        {start: "2024-05-04", end: "2024-05-10", result: 5},
        {start: "2024-05-03", end: "2024-05-10", result: 6},
        {start: "2024-05-04", end: "2024-05-12", result: 5},
        {start: "2024-05-04", end: "2024-05-13", result: 6},
        {start: "2024-04-29", end: "2024-05-05", result: 5},
        {start: "2023-12-25", end: "2024-01-01", result: 6},
        {start: "1970-01-01", end: "1970-01-02", result: 2},
    ])("$start -> $end weeks: $result", ({start, end, result}) => {
        expect(getWeekDays(start, end)).toBe(result);
    });
    it.each([
        {start: "2024-05-01", end: "2024-04-30"},
        {start: "1969-12-31", end: "1970-01-01"},
        {start: "2024-5-01", end: "2024-05-02"}
    ])("invalid param throw error $start -> $end", ({start, end}) => {
        expect(() => getWeekDays(start, end)).toThrow()
    })
});

describe("test getLocaleDay", () => {
    it.each([
        {date: "2024-05-06", locale: 'ja-JP', result:"月曜日"},
        {date: "2024-05-07", locale: 'en-US', result:"Tuesday"},
        {date: "2024-05-08", locale: 'ja-JP', result:"水曜日"},
        {date: "2024-05-09", locale: 'en-US', result:"Thursday"},
        {date: "2024-05-10", locale: 'ja-JP', result:"金曜日"},
        {date: "2024-05-11", locale: 'en-US', result:"Saturday"},
        {date: "2024-05-12", locale: 'ja-JP', result:"日曜日"},
    ])("$date is $result ($locale)", ({date, locale, result}) => {
        expect(getLocaleDay(date, locale)).toBe(result);
    });
    it.each([
        {date: "2024-5-06", locale: 'ja-JP'},
        {date: "2024-05-06", locale: 'en-U'},
        {date: "1969-12-31", locale: 'ja-JP'}
    ])("invalid param $date, $locale", ({date, locale}) => {
        expect(() => getLocaleDay(date, locale)).toThrow()
    })
});

describe("test getFirstDayOfLastMonth", () => {
    it.each([
        {date: new Date(2024, 4, 8, 0, 0, 0), result: new Date(Date.UTC(2024, 3, 1, 0, 0, 0))},
        {date: new Date(1970, 1, 14, 0, 0, 0), result: new Date(Date.UTC(1970, 0, 1, 0, 0, 0))},
        {date: new Date(2024, 0, 14, 0, 0, 0), result: new Date(Date.UTC(2023, 11, 1, 0, 0, 0))},
    ])("$date -> $result", ({date, result}) => {
        expect(getFirstDayOfLastMonth(date)).toEqual(result)
    });
})
