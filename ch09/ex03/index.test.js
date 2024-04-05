import {C, D} from './index.js';

test("# private field", () => {
    const c = new C();
    expect(c.getX()).toBe(42);
    expect(c.x).toBe(undefined)
});

test("closure private field", () => {
    const d = new D();
    expect(d.getX()).toBe(42);
    expect(d.x).toBe(undefined)
});