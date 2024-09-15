// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("/ch15.11-15/ex09/decision1.mp3");

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
  );

const socket = new WebSocket("ws://localhost:3003/");
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  switch(message.type) {
    case "start":
      startButton.setAttribute('disable', true);
      pauseButton.removeAttribute('disable');
      break;
    case "pause":
      pauseButton.setAttribute('disable', true);
      startButton.removeAttribute('disable');
      break;
    case "update":
      renderGrid(message.grid);
      break;
    default:
      console.log('invalid event type = ' + message.type)
      break;
  }
}

// grid を canvas に描画する
function renderGrid(grid) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

function sendSocket(request) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(request);
  } else {
    socket.addEventListener("open", () => {
      socket.send(request);
    })
  }
}


// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  sound.cloneNode().play();
  sendSocket(JSON.stringify({type: "toggle", row, col}))
});

startButton.addEventListener("click", () => {
  sendSocket(JSON.stringify({type: "start"}));
});

pauseButton.addEventListener("click", () => {
  sendSocket(JSON.stringify({type: "pause"}));
});




renderGrid(grid);
