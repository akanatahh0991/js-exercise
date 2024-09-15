
function calculateGaussianFilteredData(originalImageData, imageWidth, imageHeight) {
    const width = originalImageData.width;
    const height = originalImageData.height;
    const data = originalImageData.data;
    // 重み付の値
    const sig = 10;

    // グレースケールへの変換 (RGB を足して平均を取っている)
    //
    // ガウシアンフィルタを実装する場合はこの周辺のコードを変更しなさい
    // imageData の中身はそのままに別の配列に結果を格納するとよい
    // ```js
    // const outputData = new Uint8ClampedArray(imageData.data.length);
    //
    // // TODO: ここで imageData.data を参照して outputData に結果を格納
    //
    // const outputImageData = new ImageData(outputData, img.width, img.height);
    // filteredCtx.putImageData(outputImageData, 0, 0);
    // ```
    const outputData = new Uint8ClampedArray(originalImageData.data.length);
    // TODO: ここで imageData.data を参照して outputData に結果を格納
    // 5 * 5のガウシアンボカシの重み付の値
    // dx, dyは要素からの位置（-2 ~ 2）
    function gaussian55(dx, dy, sigma = 1) {
      return (
        Math.exp(-(dx ** 2 + dy ** 2) / (2 * sigma ** 2)) /
        (2 * Math.PI * sigma ** 2)
      );
    }

    // 端切れの要素をゼロパディングすることを想定して、0を返す。
    function getValueOf(data, width, height, x, y, dx, dy, offset) {
      const newX = x + dx;
      const newY = y + dy;
      if (newX < 0 || newX >= width || newY < 0 || newY >= height) {
        return 0;
      } else {
        return data[(newY * width + newX) * 4 + offset];
      }
    }

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        for (let offset = 0; offset < 4; offset++) {
          let sum = 0;
          let weightSum = 0;
          for (let dx = -2; dx <= 2; dx++) {
            for (let dy = -2; dy <= 2; dy++) {
              sum +=
                gaussian55(dx, dy, sig) *
                getValueOf(data, width, height, x, y, dx, dy, offset);
                weightSum += gaussian55(dx, dy, sig);
            }
          }
          outputData[(y * width + x) * 4 + offset] = sum/weightSum;
        }
      }
    }
    return new ImageData(outputData, imageWidth, imageHeight);
}

self.addEventListener("message", (event) => {
    const request = event.data;
    const imageData = calculateGaussianFilteredData(request.imageData, request.imageWidth, request.imageHeight);
    self.postMessage({...request, imageData})
});