import {f} from "./index.js";

test.each([
  {
    type: "normal", 
    stringAction: "$1 + $2",
    args: [1, 2],
    result: 3
  },
  {
    type: "normal", 
    stringAction: "$1 + $2 + $1",
    args: [1, 2],
    result: 4
  },
  {
    type: "normal", 
    stringAction: "$1 + $3 + $5",
    args: [1, undefined , 2, undefined ,3],
    result: 6
  },
  {
    type: "normal", 
    stringAction: "$1 + $2 + $3 + $4 + $5 + $6 + $7 + $8 + $9 + $10",
    args: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    result: 55
  },
  {
    type: "normal", 
    stringAction: "100",
    args: [],
    result: 100
  },
  {
    type: "abnormal", 
    stringAction: "$0 + $1",
    args: [1, 2],
    result: undefined
  },
  {
    type: "abnormal", 
    stringAction: "$1 + $11",
    args: [1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 11],
    result: undefined
  }
])("$type test f($stringAction)(...$args) => $result", ({type, stringAction, args, result}) => {
  if (type === 'normal') {
    expect(f(stringAction)(...args)).toBe(result);
  } else {
    expect(() => f(stringAction)(...args)).toThrow();
  }
})