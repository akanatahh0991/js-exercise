### 出力予想
falseが返される
### 理由
tryブロックが実行されると、finallyが最後に実行されるため。

```
function f() {
    try {
        return true;
    } finally {
        return false;
    }
}

console.log(f());
```