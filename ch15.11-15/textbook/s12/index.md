## 15.12 ストレージ
WebアプリケーションはブラウザAPIを使ってユーザーのコンピュータにデータを保存できる。クライアントサイドストレージはドキュメントのオリジンごとに管理される。
どの方式も暗号化機能は備えていないため機密性の高い情報は保存しないこと。
- Web Storage - `localStorage`と`sessionStorage`で構成される。文字列のキーを文字列の値にマッピングする永続的な連想配列で、(巨大ではないが、)大きなデータを保存するのに適している。
- クッキー - 古くから存在するクライアントサイドストレージ機構。クライアントサイドでもクッキーをスクリプトから制御できるが、少量のテキストデータしか保存できず、使いづらい。
- IndexedDB - オブジェクトデータベースへの非同期API。インデックス付けがサポートされている。
### 15.12.1 localStorageとsessionStorage
`Window`オブジェクトの`localStorage`と`sessionStorage`は両方とも`Storage`オブジェクトを参照する。
`Storage`オブジェクトは以下の特徴をもつ。
- プロパティ値は文字列
- プロパティは永続する。ユーザーが再読み込みしても保存された値は利用できる。

```javascript
let name = localStorage.username;         // 保存された値を読み出す。
if (!name) {
    name = prompt("What is your name?");  // ユーザに質問する。
    localStorage.username = name;         // ユーザの回答を保管する。
}
```
下記操作が可能
- delete演算子 - 指定したプロパティの削除
- for/in, Object.keys - 列挙
- clear() - 全てのプロパティの削除

#### Storageの有効期間とスコープ
- `localStorage` - 永続的。データを削除するまで保存される。オリジンごとのスコープのため、別オリジンからのアクセスはできない。
- `sessionStorage` - データを保存したスクリプトが実行されている最上位ウィンドウやブラウザタブと同じ有効期間。別オリジン、別タブからのアクセスはできない。

#### ストレージイベント
`localStorage`のデータ変更をおこなうと、ブラウザはそのデータにアクセスできるWindowオブジェクトに対してstorageイベントを発生させる。ただし、データを変更したウィンドウ自身ではイベントは発生しない。（別タブで開いているほうでイベントが発生する。）
`window.onstorage`または`addEventListener`でイベント受信可能。
storageイベントのイベントオブジェクトには下記が格納される。
- key - 設定または削除された名前（キー）。clear()呼び出し時にはnullとなる。
- newValue - 新しい値。removeItemの場合はnull。
- oldValue - 変更前の値。新しい項目が追加された場合はこのプロパティはない。
- storageArea - 変更されたStorageオブジェクト。一般的にはlocalStorage。
- url - このストレージ編小wウオ行ったスクリプトを持つドキュメントのURL

### 15.12.2 クッキー
Webブラウザ上に格納され、特定のWebページやWebサイトに関連づけられる、名前のついた少量のデータのこと。クッキーを操作するためのAPIは非常に古くて理解しづらい。`Document`の`cookie`を特殊な形式の文字列で読み書きする。

#### クッキーの読み出し
document.cookieプロパティを読み出すと、現在のドキュメントに適用されるすべてのクッキーを保持する文字列が返される。文字列は名前と値のペアのリストになっており、セミコロンと空白で区切られている。

```javascript
// ドキュメントのクッキーをMapオブジェクトとして返す。
// クッキーの値はencodeURIComponent()でエンコードされていると想定する。
function getCookies() {
    let cookies = new Map();    // 返されるオブジェクト。
    let all = document.cookie;  // すべてのクッキーを 1 つの長い文字列として取得する。
    let list = all.split("; "); // 個々の名前/値のペアに分割する。
    for(let cookie of list) {   // このリストのクッキーごとに
        if (!cookie.includes("=")) continue;  // =記号がない場合はスキップ。
        let p = cookie.indexOf("=");          // 最初の=記号を探す。
        let name = cookie.substring(0, p);    // クッキー名を取得する。
        let value = cookie.substring(p+1);    // クッキー値を取得する。
        value = decodeURIComponent(value);    // 値をデコードする。
        cookies.set(name, value);             // クッキー名と値を保存する。
    }
    return cookies;
}
```
#### クッキー属性：有効期間とスコープ
デフォルトではクッキーの有効期間は一時的。Webブラウザのセッション中はクッキーの値は保持されるが、ブラウザを終了するとクッキーの値も削除される。有効期間の指定には`max-age`属性を使用する。
クッキーのアクセスはオリジンによりスコープされる。ドキュメントのパスによってもスコープされる。このスコープは`path`と`domain`というクッキー属性で変更できる。
デフォルトではクッキーを生成したディレクトリにあるほかのWebページやサブディレクトリからアクセスできる。
`secure`はデフォルトではfalseで、ネットワーク上でクッキーは安全ではないHTTPで転送される。`secure`がtrueの場合はHTTPSの時のみ転送される。

#### クッキーの保存
```javascript
// クッキーとして名前/値のペアを保存する。encodeURIComponent()を
// 使って、値をエンコードし、セミコロンやカンマや空白をエスケープする。
// daysToLiveが数値の場合は、max-age属性を設定し、指定した日数が
// 経過した後に無効になるようにする。0を渡した場合はクッキーを削除する。
function setCookie(name, value, daysToLive=null) {
    let cookie = `${name}=${encodeURIComponent(value)}`;
    if (daysToLive !== null) {
      cookie += `; max-age=${daysToLive*60*60*24}`;
    }
    document.cookie = cookie;
}
```
- クッキーの値を変更する場合 - 同じ名前、同じpath属性、同じdomain属性を使って値を再設定する。
- クッキーを削除する場合 - 同じ名前、同じpath属性、同じdomain属性を任意の値で設定してmax-age属性を0にする。

### 15.12.3 IndexedDB
- オブジェクトデーターベース。
- スクリプトが含まれるドキュメントのオリジンでスコープされる。
- オリジンごとにいくつでもIndexedDBをもつことができる。
- オブジェクトは構造化複製アルゴリズムを使ってシリアライズされる。(Map, Set, 型付き配列を値とするプロパティを保持できる)
- 文字列や数値、Dateオブジェクトは有効なキー。（キーの重複は許されない。）

```javascript
// このユーティリティ関数は非同期でデータベースオブジェクトを取得する（必要で
// あればDBを作成し初期化する）。そして、データベースオブジェクトをcallbackに渡す。
function withDB(callback) {
    let request = indexedDB.open("zipcodes", 1); // データベースのv1をリクエスト。
    request.onerror = console.error;   // エラーはログに残す。
    request.onsuccess = () => {   // 完了したときに、この関数が呼び出される。
        let db = request.result;  // リクエストの結果はデータベース。
        callback(db);             // データベースを引数にコールバックを呼び出す。
    };

    // データベースのバージョン1がまだ存在していない場合は、このイベントハンドラが
    // 起動する。このハンドラは、DBが初めて作成されたときに、オブジェクトストアや
    // インデックスを作成したり初期化したりするために使われる。もしくは、ある
    // バージョンのDBスキーマから別のバージョンに切り替えるときに、オブジェクト
    // ストアやインデックスを修正するために使われる。
    request.onupgradeneeded = () => { initdb(request.result, callback); };
}

// withDB()は、データベースが初期化されていない場合に、この関数を
// 呼び出す。データベースを設定し、データを入力して、コールバック
// 関数にデータベースを渡す。
//
// 郵便番号データベースには、次のようなオブジェクトを格納するオブジェクトストアがある。
//
//   {
//     zipcode: "02134",
//     city: "Allston",
//     state: "MA",
//   }
//
// データベースのキーとして「zipcode」プロパティを使い、都市名のインデックスを
// 作成する。
function initdb(db, callback) {
    // ストアの名前と、このストアのキーフィールドのプロパティ名を
    // 表す「キーパス」を含むオプションオブジェクトを指定して、
    // オブジェクトストアを作成する。
    let store = db.createObjectStore("zipcodes", // ストア名。
                                     { keyPath: "zipcode" });

    // ここでは、オブジェクトストアを都市名と郵便番号でインデックスする。
    // このメソッドでは、オプションオブジェクトの一部としてではなく、
    // 必須の引数としてキーパス文字列が直接渡される。
    store.createIndex("cities", "city");

    // ここでデータベースを初期化するためのデータを取得する。zipcodes.json
    // データファイルは、www.geonames.orgのCCライセンスのデータから
    // 作成したもの：https://download.geonames.org/export/zip/US.zip
    fetch("zipcodes.json")                  // HTTPのGETリクエストを作成する。
        .then(response => response.json())  // JSONとしてボディを解釈する。
        .then(zipcodes => {                 // 40Kの郵便番号データを取得する。
            // 郵便番号データをデータベースに挿入するには、トランザクション
            // オブジェクトが必要。トランザクションオブジェクトを作成するには、
            // 使用するオブジェクトストアを指定し（1つしかない）、データベースの
            // 読み出しだけでなく書き込むことも指示する必要がある。
            let transaction = db.transaction(["zipcodes"], "readwrite");
            transaction.onerror = console.error;

            // トランザクションからオブジェクトストアを取得する。
            let store = transaction.objectStore("zipcodes");

            // IndexedDB APIの最大の特徴は、オブジェクトストアが「非常に」
            // シンプルであること。レコードを追加（または更新）する方法は以下。
            for(let record of zipcodes) { store.put(record); }

            // トランザクションが正常に完了すると、データベースが
            // 初期化されて使用できるようになるので、withDB()に
            // 渡されたコールバック関数を呼び出すことができる。
            transaction.oncomplete = () => { callback(db); };
        });
}

// 郵便番号を指定すると、IndexedDB APIを使用して、その郵便番号を持つ都市を
// 非同期に検索する。都市が見つかった場合には指定したコールバックに渡す。
// 都市が見つからなかった場合はnullを渡す。
export function lookupCity(zip, callback) {
    withDB(db => {
        // この問い合わせ用の読み出し専用のトランザクションオブジェクトを作成する。
        // 引数には、使用する必要のあるオブジェクトストアの配列を指定する。
        let transaction = db.transaction(["zipcodes"]);

        // トランザクションからオブジェクトストアを取得する。
        let zipcodes = transaction.objectStore("zipcodes");

        // ここで、指定されたzipcodeキーに一致するオブジェクトをリクエストする。
        // ここまでの行は同期型だが、この行は非同期型。
        let request = zipcodes.get(zip);
        request.onerror = console.error;  // エラーをログに記録する。
        request.onsuccess = () => {       // 成功時はこの関数を呼び出す。
            let record = request.result;  // これが問い合わせの結果。
            if (record) { // 一致するものがあれば、コールバックに渡す。
                callback(`${record.city}, ${record.state}`);
            } else {     // 一致するものがなければ、コールバックに失敗を通知する。
                callback(null);
            }
        };
    });
}

// 都市名を指定すると、IndexedDB APIを使用して、その名前（大文字と
// 小文字を区別する）を持つ（任意の州の）すべての都市のすべての
// 郵便番号レコードを非同期に検索する。
export function lookupZipcodes(city, callback) {
    withDB(db => {
        // 上記と同じように、トランザクションを作成し、オブジェクトストアを取得する。
        let transaction = db.transaction(["zipcodes"]);
        let store = transaction.objectStore("zipcodes");

        // 今回は、オブジェクトストアの都市インデックスも取得する。
        let index = store.index("cities");

        // インデックス内で、指定した都市名に一致するすべてのレコードを検索し、
        // 取得したらコールバックに渡す。もっと多くの結果が得られるのであれば、
        // 代わりにopenCursor()を使ってもよい。
        let request = index.getAll(city);
        request.onerror = console.error;
        request.onsuccess = () => { callback(request.result); };
    });
}
```
