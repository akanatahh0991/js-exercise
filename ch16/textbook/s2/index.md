## 16.2 Nodeはデフォルトで非同期
APIをデフォルトで非同期かつノンブロッキングにすることでシングルスレッドのプログラミングモデルを維持しつつ、高いレベルでの並行性を実現。
JavaScriptがPromiseをサポートする前からある機構のため、「エラーファースト」コールバックベース。（Promiseも出てきている。）
コールバックの第一引数はエラー（エラー無しの場合はnull）、第二引数は非同期関数で生成されたデータやレスポンス。
第一引数をエラーにすることでエラー有無を省略できないようにしている。
Nodeはイベントループを実行するスレッドが１つ。このスレッドはコールバックやイベントハンドラをOSに登録し、スリープする。コールバックやイベントが発生したら再び動作する。