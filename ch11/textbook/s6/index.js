const o = {s: "test", n: 0, regex: /\d{4}/g};
const json = JSON.stringify(o, null, 10);
console.log(json);

const address = {
    country: "Japan",
    state: 1,
    city: "Yokohama",
    town: "Seya"
}
const text = JSON.stringify(address, ["city", "state", "country"]);
console.log(text);

const j = JSON.stringify(o, (k, v) => v instanceof RegExp ? undefined : v);
console.log(j);