// sourceストリームからテキストの行を読み込み、指定されたパターンに
// マッチする行をdestinationストリームに書き込む。
async function grep(source, destination, pattern, encoding="utf8") {
    // バッファではなく、文字列を読み出せるようにsourceストリームを設定する。
    source.setEncoding(encoding);

    // 標準出力が想定外に閉じた場合に備えて、destinationストリームに
    // エラーハンドラを設定する（例えば、出力を「head」にパイプした場合など）。
    destination.on("error", err => process.exit());

    // 読み出したチャンクが改行で終わることはまずないので、それぞれの
    // チャンクの最後には不完全な行がある。不完全な部分を次の変数で記録する。
    let incompleteLine = "";

    // for/awaitループを使って、入力ストリームから非同期的にチャンクを読み込む。
    for await (let chunk of source) {
        // 直前のチャンクの最後の部分と、このチャンクを行単位に分割する。
        let lines = (incompleteLine + chunk).split("\n");
        // 最後の行は不完全。
        incompleteLine = lines.pop();
        // ここでlinesを巡回し、一致したものをdestinationに書き込む。
        for(let line of lines) {
            if (pattern.test(line)) {
                destination.write(line + "\n", encoding);
            }
        }
    }
    // 最後に、残りのテキストが一致するかどうかをチェックする。
    if (pattern.test(incompleteLine)) {
        destination.write(incompleteLine + "\n", encoding);
    }
}

let pattern = new RegExp(process.argv[2]);      // コマンドラインから正規表現を取得する。
grep(process.stdin, process.stdout, pattern)    // 非同期grep()関数を呼び出す。
    .catch(err => {                             // 非同期な例外を処理する。
        console.error(err);
        process.exit();
    });