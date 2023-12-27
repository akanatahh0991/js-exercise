// 16進数
console.log(0xff);
console.log(0xBADCAFE);

// ES6
console.log(0b110);
console.log(0o75);

// 浮動小数点リテラル
console.log(.333333333);
console.log(6.02e23);
console.log(1.473822E-32);

// 数値リテラルの区切り文字
const billion = 1_000_000;
const bytes = 0x89_AB_CD_EF;
const bits = 0b0001_1101_0111;
const fraction = 0.123_456_789;

// 負の0は除算した場合に正の0とは異なる振る舞いをする
const zero = 0;
const negz = -0;

console.log(zero === negz); // true
console.log(1/zero === 1/negz) //false

// 浮動小数点表現形式
const x = .3 - .2
const y = .2 - .1
console.log(x === y); // false
console.log(x === .1); // true
console.log(y === .1); // true

