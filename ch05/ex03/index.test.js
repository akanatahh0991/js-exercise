import { isHoliday1, isHoliday2 } from "./index.js";

test.each([
  ["月", false],
  ["火", false],
  ["水", false],
  ["木", false],
  ["金", false],
  ["土", true],
  ["日", true]
])("isHoliday1(%p) => %p", (japaneseDay, expected) => {
  expect(isHoliday1(japaneseDay)).toBe(expected);
})

test.each([
  ["月", false],
  ["火", false],
  ["水", false],
  ["木", false],
  ["金", false],
  ["土", true],
  ["日", true]
])("isHoliday2(%p) => %p", (japaneseDay, expected) => {
  expect(isHoliday2(japaneseDay)).toBe(expected);
})