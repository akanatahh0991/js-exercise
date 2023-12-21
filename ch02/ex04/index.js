const helloWorld = "Hello, World";
const helloWolrdWrittenInMaxEscapeSequences = helloWorld
  .normalize("NFC")
  .split("")
  .map((char) => `\\u{${char.charCodeAt(0).toString(16)}}`)
  .join("");

console.log(helloWolrdWrittenInMaxEscapeSequences);
