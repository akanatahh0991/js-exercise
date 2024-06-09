import { fibonacciIterator } from "./index.js";


test("test fibonacciIterator", () => {
    const iter = fibonacciIterator();
    const gen = fibonacciSequence();

    expect(iter.next()).toStrictEqual(gen.next());
    expect(iter.next()).toStrictEqual(gen.next());
    expect(iter.next()).toStrictEqual(gen.next());
    expect(iter.next()).toStrictEqual(gen.next());
    expect(iter.next()).toStrictEqual(gen.next());
    expect(iter.next()).toStrictEqual(gen.next());
    expect(iter.next()).toStrictEqual(gen.next());
    expect(iter.next()).toStrictEqual(gen.next());
    expect(iter.next()).toStrictEqual(gen.next());
    expect(iter.next()).toStrictEqual(gen.next());
})
function* fibonacciSequence() {
    let x = 0, y = 1;
    for(;;) {
        yield y;
        [x, y] = [y, x + y];
    }
}