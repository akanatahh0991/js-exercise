"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
  getMessageFromServer();
});
async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい
  const ticker = new EventSource("/message");
  button.disabled = true;
  let text = "";
  ticker.onmessage = (event) => {
    const content = JSON.parse(event.data);
    text += content.value;
    messageElement.textContent = text
    if (content.done) {
      ticker.close();
      button.disabled = false;
    }
  }
}
