import {add, sub, mul, div} from './index.js';

test.each([
  [{re: 4, im: 5}, {re: 8, im:-5}, {re: 12, im: 0}],
  [{re: 4.5, im: 1.4}, {re: -8, im: 2.1}, {re: -3.5, im: 3.5}]
])("add(%p, %p) => %p", (a, b, expected) => {
  const result = add(a, b)
  expect(result.re).toBeCloseTo(expected.re);
  expect(result.im).toBeCloseTo(expected.im);
})
test.each([
  [{re: 4}, {re: 8, im:-5}],
  [[5, 6], {re: 8, im:-5}],
  [4, {re: 8, im:-5}]
])("add(%p, %p) is failed because of RangeError", (a, b) => {
  expect(() => add(a, b)).toThrowError(RangeError);
})

test.each([
  [{re: 4, im: 5}, {re: 8, im:-5}, {re: -4, im: 10}],
  [{re: 4.5, im: 1.4}, {re: -8, im: 2.1}, {re: 12.5, im: -0.7}]
])("sub(%p, %p) => %p", (a, b, expected) => {
  const result = sub(a, b);
  expect(result.re).toBeCloseTo(expected.re);
  expect(result.im).toBeCloseTo(expected.im);
})
test.each([
  [{re: 4}, {re: 8, im:-5}],
  [[5, 6], {re: 8, im:-5}],
  [4, {re: 8, im:-5}]
])("sub(%p, %p) is failed because of RangeError", (a, b) => {
  expect(() => sub(a, b)).toThrowError(RangeError)
})

test.each([
  [{re: 4, im: 5}, {re: 8, im:-5}, {re: 57, im: 20}],
  [{re: 4.5, im: 1.4}, {re: -8, im: 2.1}, {re: -38.94, im: -1.75}]
])("mul(%p, %p) => %p", (a, b, expected) => {
  const result = mul(a, b);
  expect(result.re).toBeCloseTo(expected.re);
  expect(result.im).toBeCloseTo(expected.im);
})
test.each([
  [{re: 4}, {re: 8, im:-5}],
  [[5, 6], {re: 8, im:-5}],
  [4, {re: 8, im:-5}]
])("mul(%p, %p) is failed because of RangeError", (a, b) => {
  expect(() => mul(a, b)).toThrowError(RangeError)
})

test.each([
  [{re: 4, im: 5}, {re: 8, im:-5}, {re: 0.07865168539, im: 0.6741573034}],
  [{re: 4.5, im: 1.4}, {re: -8, im: 2.1}, {re: -0.4832626809, im: -0.3018564537}],
])("div(%p, %p) => %p", (a, b, expected) => {
  const result = div(a, b);
  expect(result.re).toBeCloseTo(expected.re);
  expect(result.im).toBeCloseTo(expected.im);
})
test.each([
  [{re: 4, im: 5}, {re: 0, im:0}, {re: Infinity, im: Infinity}],
  [{re: -9, im: -7}, {re: 0, im: 0}, {re: -Infinity, im: -Infinity}],
])("div(%p, %p) => %p", (a, b, expected) => {
  const result = div(a, b);
  expect(result.re).toBe(expected.re);
  expect(result.im).toBe(expected.im);
})
test.each([
  [{re: 4}, {re: 8, im:-5}],
  [[5, 6], {re: 8, im:-5}],
  [4, {re: 8, im:-5}]
])("div(%p, %p) is failed because of RangeError", (a, b) => {
  expect(() => div(a, b)).toThrowError(RangeError)
})