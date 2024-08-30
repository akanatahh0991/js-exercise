## 16.4 イベントとEventEmitter
NodeではイベントベースのAPIで`EventEmitter`が使用される。
- 主なメソッド
  - `on`, `addListener` - イベントを受診するハンドラを登録する。第一引数にイベント名、第二引数にコールバック関数を設定する。
  - `once` - 一度だけイベントを受け取り、自動的に解除して欲しい場合に使用する。
  - `off`, `removeListener` - イベントを受診するハンドラを解除する。
  - `emit` - イベントを通知する。第一引数はイベント名、第二引数以降は通知する引数
- 仕様
  - 登録された順に同期的にイベントハンドラは呼び出される。
  - イベントハンドラはthisがEventEmitterオブジェクトとなる。ただし、アロー関数の場合は定義されたコンテキストになる。
  - `error`イベントがほとんどの場合定義される。`error`に対してイベントハンドラを必ず登録すること。（登録されていないと例外で落ちる。）

[実装例](./event.cjs)

