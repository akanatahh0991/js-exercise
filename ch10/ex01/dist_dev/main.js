/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./ch10/ex01/index.cjs":
/*!*****************************!*\
  !*** ./ch10/ex01/index.cjs ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst stats = __webpack_require__(/*! ./stats.cjs */ \"./ch10/ex01/stats.cjs\");\nconst BitSet = (__webpack_require__(/*! ./sets.cjs */ \"./ch10/ex01/sets.cjs\").BitSet);\n\nconst s = new BitSet(100);\ns.insert(10);\ns.insert(20);\ns.insert(30);\nconst average = stats.mean([...s]);\nconsole.log(average);\n\n//# sourceURL=webpack://preset-js/./ch10/ex01/index.cjs?");

/***/ }),

/***/ "./ch10/ex01/sets.cjs":
/*!****************************!*\
  !*** ./ch10/ex01/sets.cjs ***!
  \****************************/
/***/ ((module) => {

eval("class AbstractSet {\n    has(x) { throw new Error('Abstract method')}\n}\n\nclass NotSet extends AbstractSet {\n    constructor(set) {\n        super();\n        this.set = set;\n    }\n\n    has(x) { return !this.set.has(x); }\n    toString() { return `{x| x ∈ ${this.set.toString()}}`}\n}\n\nclass RangeSet extends AbstractSet {\n    constructor(from, to) {\n        super();\n        this.from = from;\n        this.to = to;\n    }\n\n    has(x) { return x >= this.from && x <= this.to;}\n    toString() { return `{x| ${this.from} ≤ x ≤ ${this.to}`}\n}\n\nclass AbstractEnumerableSet extends AbstractSet {\n    get size() { throw new Error(\"Abstract method\")}\n    [Symbol.iterator]() { throw new Error(\"Abstract method\")}\n\n    isEmpty() { return this.size === 0}\n    toString() { return `{${Array.from(this).join(\", \")}}`}\n    equals(set) {\n        if (!(set instanceof AbstractEnumerableSet)) return false;\n        if (this.size !== set.size) return false;\n        for (const element of this) {\n            if (!set.has(element)) return false;\n        }\n        return true;\n    }\n}\n\nclass SingletonSet extends AbstractEnumerableSet {\n    constructor(member) {\n        super();\n        this.member = member;\n    }\n\n    has(x) { return x === this.member}\n    get size() { return 1}\n    *[Symbol.iterator]() { yield this.member }\n}\n\nclass AbstractWritableSet extends AbstractEnumerableSet {\n    insert(x) { throw new Error(\"Abstract method\")}\n    remove(x) { throw new Error(\"Abstract method\")}\n\n    add(set) {\n        for (const element of set) {\n            this.insert(element);\n        }\n    }\n\n    substract(set) {\n        for (const element of set) {\n            this.remove(element)\n        }\n    }\n\n    intersect(set) {\n        for (const element of this) {\n            if (!set.has(element)) {\n                this.remove(element)\n            }\n        }\n    }\n}\n\nclass BitSet extends AbstractWritableSet {\n    constructor(max) {\n        super();\n        this.max = max;\n        this.n = 0;\n        this.numBytes = Math.floor(max / 8) + 1;\n        this.data = new Uint8Array(this.numBytes);\n    }\n\n    _valid(x) { return Number.isInteger(x) && x >= 0 && x <= this.max; }\n\n    _has(byte, bit) { return (this.data[byte] & BitSet.bits[bit]) !== 0;}\n\n    has(x) {\n        if (this._valid(x)) {\n            const byte = Math.floor(x / 8);\n            const bit = x % 8;\n            return this._has(byte, bit);\n        } else {\n            return false;\n        }\n    }\n\n    insert(x) {\n        if (this._valid(x)) {\n            const byte = Math.floor( x / 8 );\n            const bit = x % 8;\n            if (!this._has(byte, bit)) {\n                this.data[byte] |= BitSet.bits[bit];\n                this.n++;\n            }\n        } else {\n            throw new TypeError(\"Invalid set element: \" + x);\n        }\n    }\n\n    remove(x) {\n        if (this._valid(x)) {\n            const byte = Math.floor(x / 8);\n            const bit = x % 8;\n            if (this._has(byte, bit)) {\n                this.data[byte] &= BitSet.masks[bit];\n                this.n--;\n            }\n        } else {\n            throw new TypeError(\"Invalid set element: \" + x)\n        }\n    }\n\n    get size() { return this.n }\n\n    *[Symbol.iterator]() {\n        for (let i = 0; i <= this.max; i++ ) {\n            if (this.has(i)) {\n                yield i;\n            }\n        }\n    } \n}\n\nBitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);\nBitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);\n\nmodule.exports = { BitSet }\n\n//# sourceURL=webpack://preset-js/./ch10/ex01/sets.cjs?");

/***/ }),

/***/ "./ch10/ex01/stats.cjs":
/*!*****************************!*\
  !*** ./ch10/ex01/stats.cjs ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("const sum = (x, y) => x + y;\nconst square = x => x * x;\n\nexports.mean = data => data.reduce(sum)/data.length;\nexports.stddev = function(d) {\n    const m = exports.mean(d);\n    return Math.sqrt(\n        d.map(x => x - m).map(square).reduce(sum)/(d.length - 1)\n    )\n}\n\n//# sourceURL=webpack://preset-js/./ch10/ex01/stats.cjs?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ch10/ex01/index.cjs");
/******/ 	
/******/ })()
;