import { equalArrays } from "./index";

describe("equalArrays", () => {
  it("[-0] equals [0] is true.", () => {
    expect(equalArrays([-0], [0])).toBe(true);
  });
});