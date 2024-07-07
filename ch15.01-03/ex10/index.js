const editorFront = document.querySelector("#editor-front");
const editorBack = document.querySelector("#editor-back");
editorFront.style.backgroundColor = "rgb(255, 255, 255)"

editorFront.addEventListener("click", () => {
    editorBack.focus();
});
editorBack.addEventListener("focus", () => {
    editorFront.style.backgroundColor = "rgb(192, 192, 192)"
});
editorBack.addEventListener("blur", () => {
    editorFront.style.backgroundColor = "rgb(255, 255, 255)"
});
editorBack.addEventListener("input", (event) => {
    editorFront.textContent = event.target.value;
});