```
// 組み込み関数
console.log(parseInt.toString())
console.log(encodeURI.toString())
console.log(eval.toString())

// 自作関数
function foo() { return 1};
console.log(foo.toString())

// 出力結果
// function parseInt() { [native code] }
// function encodeURI() { [native code] }
// function eval() { [native code] }
// function foo() { return 1}
```