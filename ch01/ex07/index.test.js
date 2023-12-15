import { Point } from "./index.js";

describe("Point", () => {
  describe("add", () => {
    it("add other point", () => {
      const point1 = new Point(2, 5);
      const point2 = new Point(7, 9);
      point1.add(point2);
      expect(point1.x).toBe(9);
      expect(point1.y).toBe(14);
    });
  });
});
