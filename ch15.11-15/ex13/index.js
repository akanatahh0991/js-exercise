const chatDisplay = document.querySelector("#chatDisplay");
const chatInput = document.querySelector("#chatInput");
const sendButton = document.querySelector("#sendButton");

sendButton.addEventListener("click", async () => {
  const userMessage = chatInput.value.trim();
  if (userMessage !== "") {
    addUserMessage(userMessage);
    chatInput.value = "";
    await addOllamaResponse(userMessage);
  }
});

function addUserMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message", "user-message");
  const messageBubble = document.createElement("div");
  messageBubble.classList.add("message-bubble");
  messageBubble.textContent = message;
  messageElement.appendChild(messageBubble);
  chatDisplay.appendChild(messageElement);
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

async function addOllamaResponse(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message", "bot-message");
  const messageBubble = document.createElement("div");
  messageBubble.classList.add("message-bubble");
  messageElement.appendChild(messageBubble);
  chatDisplay.appendChild(messageElement);
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
  try {
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      body: JSON.stringify({
        model: "gemma2:2b",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });
    if (!response.ok) {
      console.error(
        `ollama api cannot be used: statuscode=${response.status}, message=${response.statusText}`
      );
      return;
    }
    let body = "";
    const decorder = new TextDecoder("utf-8");
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      if (value) {
        const { done: completed, message } = JSON.parse(decorder.decode(value));
        if (completed) {
          break;
        }
        body += message?.content;
        messageBubble.innerHTML = simpleMarkdownToHtml(body);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
      }
    }
  } catch (err) {
    console.error(err);
  }
}

function simpleMarkdownToHtml(markdown) {
  return markdown
      .replace(/^## (.*)$/gm, '<h2>$1</h2>') // 見出し
      .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>') // 太字
      .replace(/\*(.*)\*/g, '<em>$1</em>') // 斜体
      .replace(/\n/g, '<br>'); // 改行
}