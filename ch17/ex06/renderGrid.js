const canvas = document.querySelector('#screen');
const ctx = canvas.getContext('2d');

// 1セルのサイズ
export const RESOLUTION = 10;

/**
 * `grid`をレンダリングする。
 * @param {Array<Array<boolean>>} grid グリッド
 */
export function renderGrid(grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? 'black' : 'white';
      ctx.fill();
      ctx.stroke();
    }
  }
}
