document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();
  const gaussianFilter = new Worker("./gaussianFilter.js");

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);
    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const loadingElement = document.getElementById("loading");
    const loaderElement = document.getElementById("loader");
    loadingElement.style.display = "flex";
    loaderElement.style.display = "flex"
    gaussianFilter.postMessage({
      imageData,
      imageWidth: img.width,
      imageHeight: img.height,
    });
    gaussianFilter.addEventListener("message", (event) => {
      filteredCtx.putImageData(event.data.imageData, 0, 0);
      loadingElement.style.display = "none";
      loaderElement.style.display = "none"
    });
  });

  reader.readAsDataURL(file);
});
