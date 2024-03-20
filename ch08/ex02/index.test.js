import { pow } from './index.js';

test.each([
  [3, 4],
  [-3, 4],
  [5, -2],
  [-6, -3],
  [2, 0],
  [4.5, 2],
  [0, 0],
  [0, 7],
  [0, -7]
])("normal test pow(%p, %p)", (x, n) => {
  expect(pow(x, n)).toBeCloseTo(x ** n)
});

test("abnormal test n is not integer", () => {
  expect(() => pow(5, 4.2)).toThrow();
})