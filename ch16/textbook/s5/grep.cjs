const stream = require("stream");

class GrepStream extends stream.Transform {
    constructor(pattern) {
        super({decodeStrings: false});  // 文字列をバッファに変換しないようにする。
        this.pattern = pattern;         // マッチさせたい正規表現。
        this.incompleteLine = "";       // 最後のデータチャンクの残り。
    }

    // このメソッドは、変換の準備が整った文字列があるときに呼び出される。
    // 変換されたデータは、指定されたコールバック関数に渡される。文字列が
    // 入力されることを想定しているので、このストリームにはsetEncoding()が
    // 呼び出されたReadableストリームに接続する必要がある。
     _transform(chunk, encoding, callback) {
        if (typeof chunk !== "string") {
            callback(new Error("Expected a string but got a buffer"));
            return;
        }
        // 不完全だった行にチャンクを追加し、
        // 全体を行に分割する。
        let lines = (this.incompleteLine + chunk).split("\n");

        // 配列の最後の要素は、新しい不完全な行。
        this.incompleteLine = lines.pop();

        // マッチする行をすべて探す。
        let output = lines                      // すべて完全な行になった状態で開始。
            .filter(l => this.pattern.test(l))  // マッチしたものを抽出し、
            .join("\n");                        // そして、また連結する。

        // マッチするものがあれば、最後に改行を追加する。
        if (output) {
            output += "\n";
        }

        // 出力がない場合でも、コールバックを常に呼び出す。
        callback(null, output);
    }

    // ストリームが閉じられる直前に、これが呼び出される。
    // 最後のデータを書き出す機会。
    _flush(callback) {
        // まだ不完全な行があり、それがマッチした場合は、
        // コールバックに渡す。
        if (this.pattern.test(this.incompleteLine)) {
            callback(null, this.incompleteLine + "\n");
        }
    }
}

// これで、このクラスを使って「grep」のようなプログラムを記述できる。
let pattern = new RegExp(process.argv[2]);  // コマンドラインから正規表現を取得する。
process.stdin                               // 標準入力から開始。
    .setEncoding("utf8")                    // Unicode文字列として読み出し、
    .pipe(new GrepStream(pattern))          // GrepStreamにパイプし、
    .pipe(process.stdout)                   // そして、標準出力にパイプする。
    .on("error", () => process.exit());     // 標準出力が閉じた場合は、終了する。