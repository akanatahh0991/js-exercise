## 15.10 ロケーション、ナビゲーション、履歴
`Window`オブジェクトと`Document`オブジェクトの`location`プロパティは`Location`オブジェクトを参照する。`Location`オブジェクトには`URL`オブジェクトのように下記プロパティがある。
- `protocol`
- `hostname`
- `port`
- `pathname`
- `hash` - ハッシュ記号(#)以降のフラグメント識別子
- `search` - 疑問符(?)以降の文字列（クエリ）

`Location`の`search`から`URL`の`searchParams`を取得するには下記のように実装する。
```javascript
let url = new URL(window.location);
let query = url.searchParams.get("q");
let numResults = parseInt(url.searchParams.get("n") || "10");
```
### 15.10.1 新しいドキュメントの読み込み
windowまたはdocumentのlocationにセットすると、ブラウザの読み込みが実行される。
```javascript
window.location = "http://www.oreilly.com";

// 相対パスもOK
document.location = "page2.html"; // 次のページを読み込む。
```
フラグメント識別子のみ指定する場合は、新しいドキュメントを読み込まず、フラグメント識別子と同じidやnameをもつ要素が表示されるようにスクロールする。#topは特別で、id="top"がなければ、先頭要素を表示する。
```javascript
location = "#top"; // ドキュメントの先頭に移動。
```
LocationオブジェクトのURL構成要素は変更できる。
```javascript
document.location.path = "pages/3.html";  // 新しいページを読み込む。
document.location.hash = "TOC";           // 目次までスクロールする。
location.search = "?page=" + (page+1);    // 新しい検索文字列で再読み込みを行う。
```
`Location.assign`は`location`プロパティに値を入れるのと同等。`Location.replace`は読み込むドキュメントを置き換えるので、置き換えたドキュメントを履歴に残さない。戻るボタンを押下してもreplaceされる前の画面ではなく、その直前に表示された画面に戻る。
スクリプトを使って新しいドキュメントをロードする場合は、`replace`を使うこと。`assign`だと、戻るキー押下で再度scriptが実行されてしまう。
`Location.reload`は際読み込みを行う。

### 15.10.2 閲覧履歴
`Window`オブジェクトの`history`プロパティには、そのウィンドウの`History`オブジェクトが格納される。

`History`オブジェクトのプロパティ
- length - 項目数
- back - 戻るボタンクリック時の処理
- forward - 進むボタンクリック時の処理
- go - 指定した整数値に合わせて移動する。正値の場合はforward、負値の場合はbackを数回おこなった動作と同じになる
```javascript
history.go(-2);   // 戻るボタンを2回押したのと同じように、2つだけ戻る。
history.go(0);    // この方法でも、現在のページを再読み込みできる。
```
現在のアプリケーションの多くは、新しいドキュメントを読み込むことなく、動的にコンテンツを生成したり読み込んだりする。そのような場合のアプリケーションの履歴管理は独自に実装する必要がある。

### 15.10.3 hashchangeイベントによる履歴管理
`location.hash`と`hashchange`イベントを使用する方法。
- `location.hash`はフラグメント識別子だが、文字列であればなんでも設定可能。
- `location.hash`を設定すると、ロケーションバーに表示されるURLは更新され、ブラウザの履歴にエントリが追加される。
- `location.hash`を変更すると、`hashchange`イベントが発火される。アプリケーションの状態ごとに一意のフラグメント識別子を用意すると、ユーザー履歴を作成できる。

### 15.10.4 pushStateによる履歴管理
`history.pushState`と`popstate`イベントを使う。
- `pushState`
  - 第一引数 - オブジェクト。ドキュメントの現在の状態を復元するために必要な情報をすべて含めること。このオブジェクトはHTMLの構造化複製アルゴリズム(JSON.stringifyよりも強力なserialize/deserialize機構)によって保存される。
  - 第二引数 - 空文字列を指定すること。状態のタイトル文字列を指定することになっているが、ブラウザでサポートされていない。
  - 第三引数 - URL。ロケーションバーに表示される。
- `replaceState` - 履歴に新しい状態を追加せずに、現在の状態と置き換える。それ以外は`pushState`と同じ。

戻るや進むを押下した場合、`popstate`イベントが通知され、イベントオブジェクトには`state`というプロパティが格納される。`pushState`の第一引数に指定したオブジェクトが格納される。

[実装例](./index.html)