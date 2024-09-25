## 16.8 HTTPクライアントとサーバー
- http - HTTP/1プロトコルに基づいたモジュール
- https - HTTPSプロトコルに基づいたモジュール
- http2 - HTTP/2プロトコルに基づいたモジュール

GETメソッドの場合は、`http.get`が使用できる。より汎用的な`http.request`を使ってPOST機能を実装した場合は次のようになる。

```javascript
const https = require("https");

function postJson(host, endpoint, body, port, username, password) {
    return new Promise((resolve, reject) => {
        const bodyText = JSON.stringify(body);
        const requestOptions = {
            method: 'POST',
            host: host,
            path: endpoint,
            Headers: {
                "Content-Type" : "application/json",
                "Content-Length" : Buffer.byteLength(bodyText)
            }
        }
        if (port) {
            requestOptions.port = port;
        }
        if (username && password) {
            requestOptions.auth = `${username}:${password}`;
        }
        const request = https.request(requestOptions);
        request.write(bodyText);
        request.end();
        request.on("error", e => reject(e));
        request.on("response", response => {
            if (response.statusCode !== 200) {
                reject(new Error(`Http Status ${response.statusCode}`));
                response.resume();
                return;
            }
            // 本当はContent-Typeヘッダーの内容を確認すること。
            response.setEncoding("utf-8");
            let body = "";
            response.on("data", chunk => { body += chunk; });
            response.on("end", () => {
                try {
                    resolve(JSON.parse(body));
                } catch(e) {
                    reject(e);
                }
            })
        });
    });
}
```
サーバー機能を実装する場合は`http.Server`を使用する。ただし、本番環境ではこのような低レベルなAPIではなく、Expressなどのフレームワークを使用すること。
