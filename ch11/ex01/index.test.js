import { TypeMap } from "./index.js";

class Foo {}
test("TypeMap Normal Test", () => {
    const typeMap = new TypeMap();
    const symbol = Symbol("symbol")
    const foo = new Foo();
    const date = new Date();
    typeMap.set(String, "string");
    typeMap.set(Number, 123);
    typeMap.set(Boolean, false);
    typeMap.set(BigInt, 9007199254740991n);
    typeMap.set(Symbol, symbol);
    typeMap.set(Foo, foo);
    typeMap.set(Date, date);

    expect(typeMap.get(String)).toBe("string");
    expect(typeMap.get(Number)).toBe(123);
    expect(typeMap.get(Boolean)).toBe(false);
    expect(typeMap.get(BigInt)).toBe(9007199254740991n);
    expect(typeMap.get(Symbol)).toBe(symbol);
    expect(typeMap.get(Foo)).toBe(foo);
    expect(typeMap.get(Date)).toBe(date);
    const foo2 = new Foo();
    typeMap.set(String, "changed")
    typeMap.set(Foo, foo2)
    expect(typeMap.get(String)).toBe("changed");
    expect(typeMap.get(Foo)).toBe(foo2);
    expect(typeMap.get(Set)).toBe(undefined)
});

describe("TypeMap abnormal test", () => {
    it("set not constructor", () => {
        expect(() => new TypeMap().set(Set(), new Set())).toThrow();
    });
    it("set null", () => {
        expect(() => new TypeMap().set(Set, null)).toThrow();
    });
    it("set undefined", () => {
        expect(() => new TypeMap().set(String, undefined)).toThrow();
    });
    it("set function", () => {
        expect(() => new TypeMap().set(Function, () => {})).toThrow();
    });
    it("set 'date'", () => {
        expect(() => new TypeMap().set(Date, "not a date")).toThrow();
    });
})