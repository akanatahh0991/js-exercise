import { point } from "./index.js";

describe("point test", () => {
  it.each([
    {
      args: { x: 1, y: 0},
      result: { r: 1, theta: 0}
    },
    {
      args: { x: 0, y: 1},
      result: { r: 1, theta: Math.PI/2}
    },
    {
      args: { x: -1, y: 0},
      result: { r: 1, theta: Math.PI}
    },
    {
      args: { x: 0, y: -1},
      result: { r: 1, theta: - Math.PI / 2}
    },
    {
      args: { x: 1, y: 1},
      result: { r: Math.sqrt(2), theta: Math.PI/4}
    },
    {
      args: { x: -1, y: 1},
      result: { r: Math.sqrt(2), theta: 3 * Math.PI/4}
    },
    {
      args: { x: 1, y: -1},
      result: { r: Math.sqrt(2), theta: - Math.PI/4}
    },
    {
      args: { x: -1, y: -1},
      result: { r: Math.sqrt(2), theta: - 3 * Math.PI/4}
    }
  ])("set $args => $result", ({args, result}) => {
    point.x = args.x;
    point.y = args.y;
    expect(point.r).toBeCloseTo(result.r);
    expect(point.theta).toBeCloseTo(result.theta);
  });

  it("set NAN to x", () => {
    expect(() => {
      point.x = NaN;
    }).toThrow()
  });

  it("set NAN to y", () => {
    expect(() => {
      point.y = NaN;
    }).toThrow()
  });

})