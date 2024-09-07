import crypto from "node:crypto";
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import url from "node:url";

let currentNonce = "";

// ES Modules で __dirname を取得
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// "/path/to/file.ext" の URL に対して "./contents/path/to/file.ext" のファイルを返すハンドラ
async function serveContentsHandler(url, _req, res) {
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
  };

  try {
    const reqPath = url.pathname;
    // Linux/MacOS/Windows で共通してファイルパスを構成できる処理
    const filePath = path.join(
      __dirname,
      "contents",
      reqPath === "/" ? "index.html" : path.join(...reqPath.split("/"))
    );

    let content = await fs.readFile(filePath, "utf-8");

    const ext = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";

    console.log("ext=" + ext + " nonce=" + currentNonce)
    // HTML ファイルの場合、nonce を <script> タグに挿入
    if (ext === ".html" && currentNonce) {
      
      content = content.replace(
        /<script\s+(type="text\/javascript"|type="module"\s+src="\.\/hello\.js")\s*>(.*?)<\/script>/g,
        (match) => {
          return match.replace('<script', `<script nonce="${currentNonce}"`);
        }
      );
      console.log(content);
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content, "utf-8");
  } catch (error) {
    if (error.code == "ENOENT") {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Content Not Found", "utf-8");
    } else {
      res.writeHead(500);
      res.end(`Internal Error: ${error.code}`, "utf-8");
    }
  }
}

// CSP のヘッダを返すミドルウェア
function cspMiddleware(_url, req, res) {
  currentNonce = crypto.randomUUID();
  res.setHeader(
    "Content-Security-Policy",
    `script-src 'nonce-${currentNonce}'`
  );

  return true;
}

// ルーティングを行う関数
function routes(...routeHandlers) {
  return async (req, res) => {
    console.log("request:", req.method, req.url);

    // クエリパラメータを含む URL をパース
    const url = new URL(`http://localhost${req.url}`);
    const method = req.method;
    const reqPath = url.pathname;

    for (const routeConfig of routeHandlers) {
      // [メソッド, パス, メインハンドラ, ...ミドルウェア] の形式でルートを定義
      const [routeMethod, routePath, ...handlers] = routeConfig;
      const mainHandler = handlers.shift();
      const middlewares = handlers;

      if (method !== routeMethod) continue;

      const routeParts = routePath.split("/");
      const reqParts = reqPath.split("/");

      if (routeParts.length !== reqParts.length && !routePath.includes("*"))
        continue;

      const params = {};
      let match = true;

      for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i] === "*") {
          // ワイルドカードセグメントの場合、残りのパスを全て受け入れる
          params["*"] = reqParts.slice(i).join("/");
          break;
        } else if (
          routeParts[i].startsWith("{") &&
          routeParts[i].endsWith("}")
        ) {
          // パラメータセグメントの場合、パラメータ名をキーにして値を取得
          const paramName = routeParts[i].slice(1, -1);
          params[paramName] = reqParts[i];
        } else if (routeParts[i] !== reqParts[i]) {
          // 一致しない場合はマッチ不成立で終了
          match = false;
          break;
        }
      }

      if (match) {
        // Middleware の実行
        for (const middleware of middlewares) {
          const result = await middleware(url, req, res, params);
          if (result === false) return; // Middleware がfalseを返した場合、以降の処理を中断
        }
        await mainHandler(url, req, res, params);
        return;
      }
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found", "utf-8");
  };
}

async function main() {
  http
    .createServer(async function (req, res) {
      await routes(["GET", "/*", serveContentsHandler, cspMiddleware])(
        req,
        res
      );
    })
    .listen(3000);
  console.log("Server running at http://localhost:3000/");
}

await main();
