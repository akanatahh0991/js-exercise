import { performance } from "perf_hooks";
const century = new Date(Date.UTC(2100, 0, 1));
console.log(century.toUTCString()); // UTC
console.log(century.toString()); // ローカル
console.log(century.toISOString()); // ISO

const d = new Date();
d.setFullYear(d.getFullYear() + 1);
// d.getDayは曜日（0が日曜）
console.log(d.toString(), d.getDate(), d.getDay());

const start = performance.now();
let i = 0;
while(i < 1000) {
    i++;
}
const end = performance.now();
console.log(end - start);