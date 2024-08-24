const util = require("util");
const fs = require("fs");   // ファイルシステムモジュールを要求する。
const pfs = {               // fsの関数をPromiseベースに変化させる。
    readFile: util.promisify(fs.readFile)
};

function readConfigFile(path) {
    return pfs.readFile(path, "utf-8").then(text => {
        return JSON.parse(text);
    });
}

readConfigFile("./data.json").then(data => console.log(data))