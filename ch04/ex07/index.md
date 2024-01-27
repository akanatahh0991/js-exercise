```javascript
function set42(key) {
  eval(`${key} = 42;`);
}

// ユーザー名などを改ざんする
let userName = "Hanako";
set42("userName");
console.log(userName);

// 無限ループさせる
set42("set42(key)");
```