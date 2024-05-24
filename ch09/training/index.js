export class C {
    #x = 42;

    getX() {
        return this.#x;
    }
}

export const D = (function() {
    let x = 42;
    return {
        getX: function() {
            return x;
        }
    }
})();

console.log(D.getX())
