import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.argv[3] || 8000;


app.use((req, res) => {
  if (req.path === '/test/mirror') {
    res.set("Content-Type", "text/plain; charset=UTF-8");
    res.status(200);
    res.write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`);
    for(const [key, value] of Object.entries(req.headers)) {
      res.write(`${key}: ${value}\r\n`);
    }
    res.write("\r\n");
    req.pipe(res);
    res.end();
  } else {
    let fileName = req.path.substring(1);
    fileName = fileName.replace(/\.\.\//g, "");
    fileName = path.resolve(__dirname, fileName);
    let type;
    switch(path.extname(fileName)) {
      case ".html":
      case ".htm":
        type = "text/html";
        break;
      case ".js":
        type = "text/javascript";
        break;
      case ".css":
        type = "text/css";
        break;
      case ".png":
        type = "image/png";
        break;
      case ".txt":
        type = "text/plain";
        break;
      default:
        type = "application/octet-stream";
        break;
    }
    const stream = fs.createReadStream(fileName);
    stream.once("readable", () => {
      res.set("Content-Type", type);
      res.status(200);
      stream.pipe(res);
    })

    stream.on("error", (err) => {
      res.set("Content-Type", "text/plain; charaset=UTF-8");
      res.status(404);
      res.end(err.message);
    })

  }

});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});