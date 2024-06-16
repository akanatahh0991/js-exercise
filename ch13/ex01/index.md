> 以下のコードを実行すると何が出力されるか予想し実際に確認しなさい。
また「[タスク](https://developer.mozilla.org/ja/docs/Web/API/HTML_DOM_API/Microtask_guide)」について調査し、この用語を用いて理由を説明しなさい。

```js
setTimeout(() => console.log("Hello, world!"), 1000);

function longRunningFunction() {
  while (true) {
    // NOTE: while (true) {} は極端な例であり、現実で見ることは少ないかもしれません。
    // しかし、時間のかかる同期処理を実行して同様の問題が発生することは実際にあります。
  }
}

longRunningFunction();
```
### 結果予想
longRunningFunctionの処理が終わらず、"Hello, world!"と表示されない。
### 理由
`longRunningFunction`のタスクが完了するまで、setTimeoutで指定した処理は実行されないため。