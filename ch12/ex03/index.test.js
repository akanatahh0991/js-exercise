import { countGen } from "./index.js";

test("test countGen",() => {
    const gen = countGen();
    expect(gen.next().value).toBe(0);
    expect(gen.next().value).toBe(1);
    expect(gen.next().value).toBe(2);
    expect(gen.next().value).toBe(3);
    gen.throw();
    expect(gen.next().value).toBe(0);
    expect(gen.next().value).toBe(1);
    expect(gen.next().value).toBe(2);
    gen.throw();
    expect(gen.next().value).toBe(0);
    expect(gen.next().value).toBe(1);
})