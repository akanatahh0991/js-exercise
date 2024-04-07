import { TypedMap } from "./index.js";

test.each([
  {
    keyType: "string",
    valueType: "number",
    entries: [
      ["a", 1],
      ["b", 2],
    ],
    setKeyValue: { key: "c", value: 3 },
    resultArray: [
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ],
  },
  {
    keyType: "number",
    valueType: "string",
    entries: [
      [1, "a"],
      [2, "b"],
    ],
    setKeyValue: { key: 3, value: "c" },
    resultArray: [
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ],
  },
])(
  "test TypedMap keyType=$keyType, valueType=$valueType",
  ({ keyType, valueType, entries, setKeyValue, resultArray }) => {
    const map = new TypedMap(keyType, valueType, entries);
    map.set(setKeyValue.key, setKeyValue.value);
    expect(Array.from(map.entries())).toStrictEqual(resultArray);
  }
);

test("abnormal test TypeMap invalid entries", () => {
  expect(
    () =>
      new TypedMap("string", "number", [
        ["a", 1],
        ["b", "2"],
      ])
  ).toThrow();
});

test("abnormal test TypeMap invalid set", () => {
  expect(() =>
    new TypedMap("string", "number", [["a", 1]]).set("b", "2")
  ).toThrow();
});
