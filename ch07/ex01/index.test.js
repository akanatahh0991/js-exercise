import { addMatrix, multiplyMatrix } from "./index.js";

describe("addMatrix test", () => {
  it.each([
    {
      matrix1: [[4]],
      matrix2: [[3]],
      result: [[7]]
    },
    {
      matrix1: [[4, 2], [-1, 7]],
      matrix2: [[3, -5], [-9, 6]],
      result: [[7, -3], [-10, 13]]
    },
    {
      matrix1: [[4, 2, 5, 1], [-1, 7, 4, 0], [9, 0, 4, 1]],
      matrix2: [[3, -5, 3, 1], [-9, 6, 5, 2], [-5, 2, 3, 3]],
      result: [[7, -3, 8, 2], [-10, 13, 9, 2], [4, 2, 7, 4]]
    },
    {
      matrix1: [[4.2, 2.1]],
      matrix2: [[3.3, -5]],
      result: [[7.5, -2.9]]
    }
  ])("normal test addMatrix($matrix1, $matrix2) => $result", ({matrix1, matrix2, result}) => {
    expect(addMatrix(matrix1, matrix2)).toStrictEqual(result);
  });
  it.each([
    {
      matrix1: [[1, undefined], [2, 3]],
      matrix2: [[1, 2], [3, 4]]
    },
    {
      matrix1: [[2, 3, 4]],
      matrix2: [[3, 4]]
    },
    {
      matrix1: [[2, "5"]],
      matrix2: [[3, 4]]
    }
  ])("abnormal test addMatrix($matrix1, $matrix2)", ({matrix1, matrix2}) => {
    expect(() => addMatrix(matrix1, matrix2)).toThrow();
  })
});

describe("multiply test", () => {
  it.each([
    {
      matrix1: [[1]],
      matrix2: [[9]],
      result: [[9]]
    },
    {
      matrix1: [[1, 2], [3, 4]],
      matrix2: [[1, 2], [3, 4]],
      result: [[7, 10], [15, 22]]
    },
    {
      matrix1: [[1, 2, -1], [3, 4, -2]],
      matrix2: [[1, 2], [3, 4], [1, 2]],
      result: [[6, 8], [13, 18]]
    },
    {
      matrix1: [[1.5, -1.5]],
      matrix2: [[2], [4]],
      result: [[-3]]
    },
  ])("normal test multiplyMatrix($matrix1, $matrix2) => $result", ({matrix1, matrix2, result}) => {
    expect(multiplyMatrix(matrix1, matrix2)).toStrictEqual(result);
  });
  it.each([
    {
      matrix1: [[undefined, 3]],
      matrix2: [[4], [5]]
    },
    {
      matrix1: [[5, 3, 7], [4, 5, 1]],
      matrix2: [[4, 4, 5], [5, 7, 8]]
    },
    {
      matrix1: [[5, 3], [4, 5, 1]],
      matrix2: [[4, 4], [7, 8]]
    }
  ])("abnormal test multiplyMatrix($matrix1, $matrix2)", ({matrix1, matrix2}) => {
    expect(() => multiplyMatrix(matrix1, matrix2)).toThrow();
  })
})