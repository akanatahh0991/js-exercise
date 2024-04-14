export default class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    calculateArea() {
        return this.radius ** 2 * Math.PI;
    }
}