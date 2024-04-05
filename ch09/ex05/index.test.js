import { instanceOf } from "./index.js";

class A {}
class B extends A {}
class C extends B {}
class D extends C {}
class E {}

function F() {}
F.prototype = A.prototype;

test.each([
    { obj: new D(), constructor: D},
    { obj: new D(), constructor: C},
    { obj: new D(), constructor: B},
    { obj: new D(), constructor: A},
    { obj: new D(), constructor: Object},
    { obj: new A(), constructor: B},
    { obj: new E(), constructor: A},
    { obj: new F(), constructor: A},
    { obj: 1, constructor: Number},
    { obj: null, constructor: Object},
    { obj: undefined, constructor: Object}
])("normal test instanceOf($obj, $constructor)", ({obj, constructor}) => {
    expect(instanceOf(obj, constructor)).toBe(obj instanceof constructor);
});

test.each([
    { obj: new A(), constructor: new A()},
    { obj: null, constructor: null},
    { obj: undefined, constructor: undefined},
    { obj: [4, 5, 6], constructor: []},
])("abnormal test instanceOf($obj, $constructor)", ({ obj, constructor}) => {
    expect(() => instanceOf(obj, constructor)).toThrow();
    expect(() => obj instanceof constructor).toThrow();
})

