/**
 * WebSocket サーバに文字列データを含むリクエストメッセージを送信する
 * @param {string} request リクエスト本文
 * @param {number} timeoutMSec タイムアウト時間(msec)
 * @returns {Promise<string, Error>} 
 */
async function sendRequest(message, timeoutMSec = 5000) {
    return await withTimeout(
        new Promise((resolve, reject) => {
            const socket = new WebSocket("ws://localhost:3003/");
            const id = crypto.randomUUID();
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id,
                    message
                }));
            };
            socket.onmessage = (event) => {
                const res = JSON.parse(event.data);
                if (res.id === id) {
                    resolve(res.message);
                }
            };
            socket.onclose = () => {
                reject(new Error("closed connection"))
            };
            socket.onerror = () => {
                reject(new Error("websocket error"))
            }
        }),
        timeoutMSec
    )
}

function receiveRequest() {
    const socket = new WebSocket("ws://localhost:3003/");
    socket.onmessage = (event) => {
        console.log(event.data)
        const res = JSON.parse(event.data);
        if (res.responsed) {
            return;
        }
        socket.send(JSON.stringify({id: res.id, message: `Hello, ${res.message}`, responsed: true}))
    }
}

async function withTimeout(promise, timeoutMsec) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("timeout"))
        }, timeoutMsec);
    })
    return Promise.race([promise, timeoutPromise]);
}

function setForm(inputId, buttonId, resTextId) {
    document.querySelector(`#${buttonId}`).addEventListener("click", async () => {
        const reqText = document.querySelector(`#${inputId}`).value;
        const resTextElement = document.querySelector(`#${resTextId}`)
        resTextElement.textContent = 'Loading...'
        try {
            const res = await sendRequest(reqText);
            resTextElement.textContent = res;
        } catch(err) {
            resTextElement.textContent = err.message
        }
    })
}

setForm("request1", "sendBtn1", "response1");
setForm("request2", "sendBtn2", "response2");
setForm("request3", "sendBtn3", "response3");
receiveRequest();
