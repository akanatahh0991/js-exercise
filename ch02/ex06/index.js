
export const fizzbuzz = () => { let texts = []; for(let i = 1; i <= 100; i++) { if (i % 3 === 0 && i % 5 === 0) { texts.push("FizzBuzz")} else if (i % 3 === 0) {texts.push("Fizz")} else if (i % 5 === 0) {texts.push("Buzz")} else {texts.push(i)}}; return texts.join('\n') + '\n'}
// 原型
// export const fizzbuzz = () => {
//   let texts = []
//   for(let i = 1; i <= 100; i++) {
//     if (i % 3 === 0 && i % 5 === 0) {
//       texts.push("FizzBuzz")
//     } else if (i % 3 === 0) {
//       texts.push("Fizz")
//     } else if (i % 5 === 0) {
//       texts.push("Buzz")
//     } else {
//       texts.push(i)
//     }
//   }
//   return texts.join('\n') + '\n'
// }