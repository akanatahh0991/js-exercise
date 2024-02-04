
try {
  throw 5; // throwするのはエラーじゃなくてもいい。
} catch (e) {
  console.log(e); // 5が返される
} finally {
  console.log("finally");
}

/**
 * エラーキャッチの順番を確認する
 * @param {number} num 
 * @returns 特定の数値
 */
function testErrorCatchingOrder(num) {
  try {
    if (Number.isInteger(num)) {
      throw new RangeError("invalid num");
    }
    return num;
  } catch (e) {
    return num * 10
  } finally {
    return num * 100 // finallyのreturnが必ず返る
  }
}

console.log(testErrorCatchingOrder(10)); // 1000
console.log(testErrorCatchingOrder(1.2)); // 120

// ブラウザで実行すること。
// function factorial(x) {
//   if (x < 0) throw new Error("x must not be negative");
//   let f;
//   for (f = 1; x > 1; f *= x, x--);
//   return f
// }

// try {
//   let n = Number(prompt("Please enter a positive integer", ""));
//   let f = factorial(n);
//   alert(n + "! = " + f);
// } catch (ex) {
//   alert(ex)
// }

try {
  throw new Error("error1");
} catch (e) {
  console.log(e.name);
} finally {
  throw new RangeError("error2");
}


