> 2. 開発者ツールで CSS に関して実行できる操作を検索エンジンで調べ、便利だと思ったものを 3 つ挙げなさい

- :hov - focusやhoverの状態をシュミレートできる
- :cls - classを追加して動作を確認できる
- toggle common rendering emulations - darkモードなど検証できる

> 3. 15.4-10.2 のアプリの `body` 要素に対し、元々 HTML および JS 内で利用していなかった Tailwind CSS のクラス (`bg-rose-600` など何でも良い) を開発者ツールから追加すると変更が反映されないが、これは何故か調べなさい

Tailwindではビルド時に未使用のCSSクラスを除いてビルドするため。
