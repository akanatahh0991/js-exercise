export function fib(n) {
  if (!Number.isInteger(n) || n < 0) {
    return null;
  }
  // 以下が単純だが、処理が重すぎる。
  // // f0 = 0, f1 = 1
  // if (n <= 1) {
  //   return n;
  // }
  // return fib(n - 1) + fib(n - 2);

  switch (n) {
    case 0:
      return 0;
    case 1:
      return 1;
    default:
      let prev = 0;
      let current = 1;
      let temp;
      for (let i = 2; i <= n; i++) {
        temp = current + prev;
        prev = current;
        current = temp;
      }
      return current;
  }
}
