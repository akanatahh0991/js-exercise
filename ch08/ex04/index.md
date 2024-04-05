## 出力予想
### nmのコンソール出力
false, true
### arrowのコンソール出力：
true, false

## 説明
### nmのコンソール出力結果について
nmは通常関数のため、呼び出しオブジェクトである`nest`が`this`となる。

- arrowのコンソール出力結果について
arrowはアロー関数のため、関数が定義された環境の`this`を継承する。ゆえに`obj`が`this`となる。