## 16.3 バッファ
Nodeプログラムで頻繁に使用されるデータ型。Bufferはバイトの並びである点に注意。
NodeのBufferクラスはUint8Arrayのサブクラス。（元々型付き配列がないときからBufferクラスはあった。）
BufferクラスとUint8Arrayの違いは、BufferはJavaScriptの文字列と相互に変換できるように設計されている点。
```javascript
let b = Buffer.from([0x41, 0x42, 0x43]);            // <Buffer 41 42 43>
b.toString()                                        // => "ABC"; デフォルトは"utf8"。
b.toString("hex")                                   // => "414243"

let computer = Buffer.from("IBM3111", "ascii");     // 文字列をBufferに変換する。
for(let i = 0; i < computer.length; i++) {          // Bufferをバイト配列として使う。
    computer[i]--;                                  // Bufferは変更可能。
}
computer.toString("ascii")                          // => "HAL2000"
computer.subarray(0,3).map(x=>x+1).toString()       // => "IBM"

// Buffer.alloc()を使って、「空の」バッファを作成する。
let zeros = Buffer.alloc(1024);                     // 1024個のゼロ。
let ones = Buffer.alloc(128, 1);                    // 128個の1。
let dead = Buffer.alloc(1024, "DEADBEEF", "hex");   // バイトのパターンを繰り返す。

// Bufferには、マルチバイトの値を任意のオフセットに
// 対して読み書きするメソッドがある。
dead.readUInt32BE(0)        // => 0xDEADBEEF
dead.readUInt32BE(1)        // => 0xADBEEFDE
dead.readBigUInt64BE(6)     // => 0xBEEFDEADBEEFDEADn
dead.readUInt32LE(1020)     // => 0xEFBEADDE
```