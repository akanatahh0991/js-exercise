import {convertfromCRLFtoLF, convertfromLFtoCRLF} from "./index.js";

describe("convertfromCRLFtoLF", () => {
  it('convert from CRLF to LF', () => {
    expect(convertfromCRLFtoLF("a\r\nb\nc\r\nd\ne")).toBe("a\nb\nc\nd\ne")
  });
  it('convert from LF to CRLF', () => {
    expect(convertfromLFtoCRLF("a\r\nb\nc\r\nd\ne")).toBe("a\r\nb\r\nc\r\nd\r\ne")
  });
  it('not convert from "\\\\r\\n" to "\\n"', () => {
    expect(convertfromCRLFtoLF("a\\r\nb")).toBe("a\\r\nb");
  });
  it('not convert from "\\\\n" to "\\r\\n"', () => {
    expect(convertfromLFtoCRLF("a\\nb")).toBe("a\\nb");
  });
});