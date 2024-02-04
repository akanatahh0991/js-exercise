import { parseJson } from "./index.js";
describe("parseJson success test", () => {
  it.each([
    ['null', null],
    ['true', true],
    ['false', false],
    ['"text"', "text"],
    ['1.1', 1.1],
    ['1e+5', 1e+5],
    ['[1, 5.9, "text"]', [1, 5.9, "text"]],
    ['{"name": "Takahiro", "age": 68, "friends": ["Hitomi", "Koich", "Yumi"]}', {name: "Takahiro", age: 68, friends: ["Hitomi", "Koich", "Yumi"]}]
  ])("parseJson(%p) => {success: true, data: %p}", (json, value) => {
    expect(parseJson(json)).toEqual({success: true, data: value});
  })
})

describe("parseJson failure test", () => {
  it.each([
    ['undefined'],
    ['Infinity'],
    ['NaN'],
    ['[1, 5.9, "text",]']
    ['{"name": "Takahiro", age: 68, "friends": ["Hitomi", "Koich", "Yumi"]}', {name: "Takahiro", age: 68, friends: ["Hitomi", "Koich", "Yumi"]}]
  ])("parseJson(%p) => {success: false, error: %p}", (json) => {
    const { success, error } = parseJson(json);
    expect(success).toBe(false);
    expect(error).toBeInstanceOf(SyntaxError);
  })
})
