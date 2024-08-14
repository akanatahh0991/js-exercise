> Active や Completed を選択後にブラウザのリロードを行うとどうなるだ>ろうか。hashchange と pushState それぞれの実装について調べなさい
  (ヒント: 開発者ツールでどのような通信が発生しているか調べてみなさい)。

### hashchangeを使用した場合
`ch15.04-10/ex11/index.html`にアクセスして200で成功する。
### pushStateを使用した場合
`Cannot GET /ch15.04-10/ex12/completed`と表示される。

> ここまでの例は [serve](https://www.npmjs.com/package/serve) コマンドで HTML や JS といったファイル配信するサーバーを立ち上げてきた。
  サーバー側がどのような挙動をすれば pushState を使った実装が期待通り動作するか考えて答えなさい。

存在しないルートであっても、常に特定のファイル（index.html）を返すようにする。