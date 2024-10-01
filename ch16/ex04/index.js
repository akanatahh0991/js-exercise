import fs from "fs";
import iconv from "iconv-lite";
fs.createReadStream("./hello.txt")
  .pipe(iconv.decodeStream("Shift_JIS"))
  .pipe(iconv.encodeStream("utf-8"))
  .pipe(process.stdout);
