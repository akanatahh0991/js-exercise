import { convertToEscapeCharFrom1, convertToEscapeCharFrom2 } from "./index.js";

test.each([
  ["It is \0 test", "It is \\0 test"],
  ["It is \b test", "It is \\b test"],
  ["It is \t test", "It is \\t test"],
  ["It is \n test", "It is \\n test"],
  ["It is \v test", "It is \\v test"],
  ["It is \f test", "It is \\f test"],
  ["It is \r test", "It is \\r test"],
  ["It is \" test", 'It is \\" test'],
  ['It is \' test', "It is \\' test"],
  ["It is \\ test", "It is \\\\ test"],
])("convertToEscapeCharFrom1(%p) => %p", (text, expected) => {
  expect(convertToEscapeCharFrom1(text)).toBe(expected)
})

test.each([
  ["It is \0 test", "It is \\0 test"],
  ["It is \b test", "It is \\b test"],
  ["It is \t test", "It is \\t test"],
  ["It is \n test", "It is \\n test"],
  ["It is \v test", "It is \\v test"],
  ["It is \f test", "It is \\f test"],
  ["It is \r test", "It is \\r test"],
  ["It is \" test", 'It is \\" test'],
  ['It is \' test', "It is \\' test"],
  ["It is \\ test", "It is \\\\ test"],
])("convertToEscapeCharFrom2(%p) => %p", (text, expected) => {
  expect(convertToEscapeCharFrom2(text)).toBe(expected)
})