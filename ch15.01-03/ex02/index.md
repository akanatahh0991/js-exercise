## 動作確認方法
### スクリプトの配置
1. `express`でlocalhostの3000ポートにサーバーを立ち上げる。
2. cross-originを許可しておく(server.mjs参照。)

### ui側
1. `index.html`内でlocalhostの3000ポートにある`module.mjs`を読み込むようにしておく。
2. Live Serverでlocalhostの5500ポートに`index.html`をアップして、`import(url)`で`module.mjs`を表示できるか確かめる。