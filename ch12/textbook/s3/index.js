function* fibonacciSequence() {
    let x = 0, y = 1;
    for(;;) {
        yield y;
        [x, y] = [y, x + y];
    }
}

function fibonnacci(n) {
    for (const f of fibonacciSequence()) {
        if (n-- <= 0) return f;
    }
}

console.log(fibonnacci(20));

// 指定した反復可能オブジェクトから最初のn個の要素を返す。
function* take(n, iterable) {
    const it = iterable[Symbol.iterator]();
    while( n-- > 0) {
        const next = it.next();
        if (next.done) return;
        else yield next.value
    }
}

console.log([...take(4, fibonacciSequence())])

console.log(fibonacciSequence())

function* sequence(...iterables) {
    for (const iterable of iterables) {
        yield* iterable; // yield for(const item of iterable) yield itemと同じ
    }
}

[...sequence("abc", [5, 6, 7])];