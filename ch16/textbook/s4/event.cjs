const EventEmitter = require("events");     // モジュール名はクラス名と一致してない。
const net = require("net");
const server = new net.Server();              // Serverオブジェクトを作成する。
console.log(server instanceof EventEmitter)              // => true: ServerはEventEmitter.
server.on("connection", socket => {     // 「connection」イベントを待ち受ける。
    // Serverの「connection」イベントでは、クライアントと
    // 接続したばかりのsocketオブジェクトが渡される。次のコードでは、
    // データをクライアントに送信した後、切断している。
    socket.end("Hello World", "utf8");
});

const emitter = new EventEmitter();
emitter.addListener("test", () => {
    console.log("test");
})

emitter.emit("test", "called");

console.log(emitter instanceof EventEmitter);
