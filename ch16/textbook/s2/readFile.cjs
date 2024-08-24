const fs = require("fs");   // ファイルシステムモジュールを要求する。

// 設定フィルを読み込み、JSONとして解析し、その結果の値をコールバックに
// 渡す。何か問題が発生した場合は、標準エラー出力にエラーメッセージを出力し、
// nullを引数にしてコールバックを呼び出す。
function readConfigFile(path, callback) {
    fs.readFile(path, "utf8", (err, text) => {
        if (err) {      // ファイル読み込みに何か問題が発生した。
            console.error(err);
            callback(null);
            return;
        }
        let data = null;
        try {
            data = JSON.parse(text);
        } catch(e) {    // ファイルの内容の解析で問題が発生した。
            console.error(e);
        }
        callback(data);
    });
}

readConfigFile("./data.json", (data) => {console.log(data)})