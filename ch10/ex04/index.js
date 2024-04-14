// 再エクスポートのインポート
import {Circle, Rectangle} from './shape.js';
// デフォルトエクスポートと名前変更を伴うエクスポートのインポート
import minus, {plus as plus} from './calculator.js';

const circle = new Circle(3);
const rectangle = new Rectangle(4, 5);

console.log(circle.calculateArea(), rectangle.calculateArea());

console.log(plus(4, 5));
console.log(minus(6, 2))