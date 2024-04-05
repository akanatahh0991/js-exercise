export class C {
    #x = 42;

    getX() {
        return this.#x;
    }
}

export const D = (function() {
    let x = 42;
    return function() {
        this.getX = function() {
            return x;
        }
    }
})();
