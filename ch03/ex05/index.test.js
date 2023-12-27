import {convertfromCRLFtoLF, convertfromLFtoCRLF} from "./index.js";

describe("convertfromCRLFtoLF", () => {
  it('"a\r\nb\nc\r\nd\ne": CRLF -> LF', () => {
    expect("a\nb\nc\nd\ne").toBe(convertfromCRLFtoLF("a\r\nb\nc\r\nd\ne"))
  });
  it('"a\r\nb\nc\r\nd\ne": LF -> CRLF', () => {
    expect("a\r\nb\r\nc\r\nd\r\ne").toBe(convertfromLFtoCRLF("a\r\nb\nc\r\nd\ne"))
  });
});