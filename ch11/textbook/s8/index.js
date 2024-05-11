

function test() {
    console.error("error is occurred.");
    console.trace("trace")
}

test();

const url = new URL("https://example.com/search");
console.log(url.search);
url.searchParams.append("q", "term");
console.log(url.search);
url.searchParams.set("q", "x"); // パラメータ変更
console.log(url.search);
console.log(url.searchParams.get("q"));
url.searchParams.append("opts", "1");
url.searchParams.append("opts", "&");
console.log(url.search);
console.log(url.searchParams.getAll("opts"));
url.searchParams.sort();
console.log(url.search);
console.log([...url.searchParams]);
url.searchParams.delete("opts");
console.log(url.search);
console.log(url.href);

let url2 = new URL("http://example.com");
let params = new URLSearchParams();
params.append("q", "term");
params.append("opts", "exact");
params.toString()       // => "q=term&opts=exact"
console.log(params)
url2.search = params;
console.log(url2.href)                // => "http://example.com/?q=term&opts=exact"