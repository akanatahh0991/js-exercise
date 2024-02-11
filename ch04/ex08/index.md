以前のjavascriptでは、undefinedも上書きできてしまったため、次のような実装が可能であった。
```javascript
var undefined = 4;
console.log(undefined); // 4と表示
```
現在は、ECMAScript5の仕様により、undefinedは書き込み不可な設定になっており、`void 0`のような書き方は不要になった。