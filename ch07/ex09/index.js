console.log("𠮷野家"[0]);
console.log("👨‍👨‍👧‍👧"[0]);

const yoshinoya = "𠮷野家"
for (let i = 0; i < yoshinoya.length; i++) {
  console.log(yoshinoya.charCodeAt(i), yoshinoya.charCodeAt(i).toString(16));
}

console.log("\u{d842}\u{dfb7}") // 吉

const kazokuEmoji = "👨‍👨‍👧‍👧"
for (let i = 0; i < kazokuEmoji.length; i++) {
  console.log(kazokuEmoji.charCodeAt(i), kazokuEmoji.charCodeAt(i).toString(16));
}

console.log("\u{d83d}\u{dc68}") // 👨

