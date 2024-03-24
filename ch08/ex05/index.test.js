import { sequenceToObject } from "./index.js";

test.each([
  {kind: "normal", values: [], result: {}},
  {kind: "normal", values: ["a", 14, "b", {}, "c", [34]], result: {a: 14, b: {}, c: [34]}},
  {kind: "normal", values: ["a", 14, "b", "B", "a", "new value"], result: {a: "new value", b: "B"}},
  {kind: "abnormal", values: ["a", 14, "b"], result: new TypeError()},
  {kind: "abnormal", values: [14, 13, "b", 15], result: new TypeError()},
])("$kind test sequestToObject(...$values) is $result", ({kind, values, result}) => {
  switch(kind) {
    case "normal":
      expect(sequenceToObject(...values)).toStrictEqual(result);
      break;
    case "abnormal":
      expect(() => sequenceToObject(...values)).toThrow()
      break;
    default:
      // Do Nothing
  }
})
