const os = require("os");
const fs = require("fs");
const path = require("path");
console.log(process.cwd());
console.log(__filename);
console.log(__dirname);
console.log(os.homedir());

const testDataPath = path.join(__dirname, "test.data");
const buffer = fs.readFileSync(testDataPath);
console.log(buffer);
const text = fs.readFileSync(testDataPath, "utf-8");
console.log(text);

const testCsvpath = path.join(__dirname, "test.csv");
fs.promises.readFile(testCsvpath, "utf-8")
.then((text) => {
    console.log(text);
});

const testCsvCopyPath = path.join(__dirname, "test_copy.csv");
const output = fs.createWriteStream(testCsvCopyPath);
fs.createReadStream(testCsvpath).pipe(output);

console.log("-----------")
fs.open(testCsvpath, "r", (err, fd) => {
    if (err) {
        return;
    }
    try {
        fs.read(fd, Buffer.alloc(400), 0, 400, 0, (e, b) => {
            console.log(b);
        })
    } finally {
        fs.close(fd);
    }
})

const stats = fs.statSync(testCsvpath);
console.log(stats.isFile());
console.log(stats.isDirectory());
console.log(stats.uid); // 所有ユーザーのid
console.log(stats.atime); // アクセス日時

fs.mkdirSync(path.join(__dirname, "/lib/sub"), { recursive: true});