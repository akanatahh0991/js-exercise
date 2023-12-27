describe("equal", () => {
  it("Hundred Points Symbol length is 2", () => {
    expect(2).toBe("💯".length);
  });
  it('"\uD83D\uDCAF"(uft-16) equals "\u{0001F4AF}"(utf-32)', () => {
    const stringUtf16 = "\uD83D\uDCAF"
    const stringUtf32 = "\u{0001F4AF}"
    expect(true).toBe(stringUtf16 === stringUtf32);
  });
});