- 開発者ツールを開いた状態のタブで HTML を開く場合
  
  { answer: 42 }, { answer: 0 }が表示される。

- HTML を開いた状態のタブで開発者ツールを開く場合
  
  { answer: 0 }, { answer: 0 }が表示される。

console.logはコンソールが表示された際に、そのオブジェクトの参照先を表示するので、script実行時の値を表示するには以下のように実装を変更する必要がある。

```javascript
console.log(JSON.parse(JSON.stringify(obj)))
```

[consoleの仕様]("https://developer.mozilla.org/ja/docs/Web/API/console/log_static")