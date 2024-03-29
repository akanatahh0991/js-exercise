import { any, catching } from "./index.js";

// TODO テストの追加
test.each([
  { conditions: [], args: [0], result: false },
  { conditions: [(n) => n > 0], args: [1], result: true },
  { conditions: [(n) => n > 0, (n) => n < 0], args: [0], result: false },
  { conditions: [(n) => n > 0, (n) => n < 0], args: [42], result: true },
  { conditions: [(n) => n > 0, (n) => n < 0], args: [-0.5], result: true },
])(
  "test any: conditions=$conditions, args=$args => $result",
  ({ conditions, args, result }) => {
    expect(any(...conditions)(...args)).toBe(result);
  }
);

test.each([
  {
    action: JSON.parse,
    errorHandler: (e) => {
      return { error: e.toString() };
    },
    args: ['{"a": 1}'],
    result: { a: 1 },
  },
  {
    action: JSON.parse,
    errorHandler: (e) => {
      return { error: e.name };
    },
    args: ["{Invalid Json}"],
    result: { error: "SyntaxError" },
  },
])("test catching $args -> $result", ({action, errorHandler, args, result}) => {
  expect(catching(action, errorHandler)(...args)).toStrictEqual(result);
});
