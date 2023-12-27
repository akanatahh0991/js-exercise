

```typescript
let a = 0,
  b = 0;

// 以下のコードと同じ
// const c = a;
// ++b;
// prettier-ignore
const c
=
a
// prettier-ignore
++
b

// 0, 1, 0
console.log(a, b, c);

// eにa=0が代入されてから、a++が実行される。
// const e = a;
// a++;
// b;
// prettier-ignore
const e = a++
b;

// 1, 1, 0
console.log(a, b, e);
```