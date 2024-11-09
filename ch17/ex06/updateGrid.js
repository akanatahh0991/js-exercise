// eslint-disable-next-line valid-jsdoc
/**
 * グリッドを更新する
 * @param {Array<Array<boolean>>>} grid グリッド
 * @returns 新しいグリッド
 */
export function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
      let alive = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) {
            // 何もしない
          } else {
            const adjacentCell = grid[row + i]?.[col + j];
            if (adjacentCell === true) {
              alive++;
            }
          }
        }
      }
      const targetCell = nextGrid[row][col];
      if (!targetCell && alive === 3) {
        nextGrid[row][col] = true;
      } else if (targetCell && (alive === 2 || alive === 3)) {
        nextGrid[row][col] = true;
      } else if (targetCell && alive <= 1) {
        nextGrid[row][col] = false;
      } else if (targetCell && alive >= 4) {
        nextGrid[row][col] = false;
      } else {
        // 何もしない
      }
    }
  }
  return nextGrid;
}
