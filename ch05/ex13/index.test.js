import { fibonacciGenIterator } from "./index.js";

test("fibonacciGenIterator test Up to the 15th element of fibonacci array.", () => {
  const resultArry = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610]
  const genIterator = fibonacciGenIterator()
  resultArry.forEach((result) => {
    expect(genIterator.next().value).toBe(result);
  })
})