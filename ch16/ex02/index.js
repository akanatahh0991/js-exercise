import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く

["SIGINT", "SIGQUIT"].forEach((parentSingal) => {
  process.on(parentSingal, (signal) => {
    child?.kill(signal);
    child?.on("exit", (_, s) => {
      if (signal === s) {
        console.log("process exit")
        process.exit(null);
      }
    })
  })
});

for(;;) {
  const [code, signal] = await startChild();
  if (code !== 0 && signal == null) {
    // 子プロセスが異常終了した場合は再起動する。
    console.log("child reboot")
  } else {
    break;
  }
}


