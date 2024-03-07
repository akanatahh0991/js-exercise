import {sort} from './index.js';

const compare = (lhs, rhs) => (lhs < rhs ? -1: lhs > rhs ? +1 :0)
test.each([
  [[]],
  [[2]],
  [[2, 1, 5, 0]],
  [[11, 10, 11, 10, 2]]
])("%p sort", (array) => {
  console.log(array);
  expect(sort([...array], compare)).toStrictEqual([...array].sort(compare))
})