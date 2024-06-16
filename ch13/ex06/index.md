## jQuery Deferrdとは
jQueryにおいて非同期処理を扱うための仕組み。Promise同様、メソッドチェーンで処理を続けることができる。

## jQuery DeferredとPromiseの主な違い
- jQuery Deferredは外部から状態変更する手段を提供している（done, fail, always）
- Promiseにおけるthenは渡されたコールバックをマイクロタスクキューに追加する。マイクロタスクキューはタスクよりも先に実行されるため、jQueryとは異なる処理順となる