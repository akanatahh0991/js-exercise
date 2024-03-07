
/**
 * fizzbuzzの文字列をコンソール出力します。
 * @param {number} n 自然数
 */
function fizzbuzz(n) {
  const nArry = new Array(n).fill(0).map((_, index) => {
    return index + 1;
  });
  const fizzArry = nArry.filter((value) => value % 3 === 0);
  const buzzArry = nArry.filter((value) => value % 5 === 0);
  const fizzbuzzArry = nArry.filter((value) => value % 15 === 0);
  buzzArry.forEach((value) => {
    nArry[value -1] = "Buzz"
  });
  fizzArry.forEach((value) => {
    nArry[value -1] = "Fizz";
  });
  fizzbuzzArry.forEach((value) => {
    // valueから1引いた値がindex
    nArry[value -1] = "FizzBuzz";
  });
  nArry.forEach((value) => {
    console.log(value);
  })
}

/**
 * fとgの要素の差を２乗した値を合計します。
 * @param {number[]} f 
 * @param {number[]} g 
 * @returns {number} fとgの要素の差を２乗した値の合計
 */
function sumOfSquaredDifference(f, g) {
  return f.reduce((accumulator, fValue, index) => accumulator + ((fValue - g[index]) ** 2), 0)
}

/**
 * 配列の偶数の要素の和が42以上の場合にtrue、42未満の場合はfalseを返す。
 * @param {number[]} array 
 * @returns {boolean} 配列の偶数の要素の和が42以上の場合にtrue、42未満の場合はfalse
 */
function sumOfEvensIsLargerThan42(array) {
  const sumOfEvens = array.filter((value) => value % 2 === 0).reduce((accumulator, value) => accumulator + value);
  return sumOfEvens >= 42;
}

fizzbuzz(20);
console.log("******");
const f = [3, 5];
const g = [1, 2];
const result = sumOfSquaredDifference(f, g)
console.log("sumOfSquaredDifference ", result);
console.log("******");
const under42EvensArray = [1, 22, 18, 9, 7];
const over42EvensArray = [1, 22, 20, 9, 7];
console.log("sumOfEvensIsLargerThan42 under42EvensArray", sumOfEvensIsLargerThan42(under42EvensArray));
console.log("sumOfEvensIsLargerThan42 over42EvensArray", sumOfEvensIsLargerThan42(over42EvensArray));


