/**
 * ## 15.2 イベント
 * クライアントサイドJavascriptでは、HTMLドキュメント中のすべての要素でイベントが発生する。
 * - イベントタイプ
 * 発生したイベントの種類を表す文字列。(mousemove: マウスを動かした, keydown: キーボードのキーの押下, load: ドキュメントとリソースの読み込み完了 など)
 * - イベントターゲット
 * イベントが発生したオブジェクトや関連しているオブジェクト。
 * イベントターゲットはWindow, Document, Elementオブジェクトになることが多い。
 * ワーカースレッドを使った場合、Workerオブジェクトのmessageイベントが発生する。
 * - イベントハンドラ（または、イベントリスナー）
 * イベントを処理する関数。
 * - イベントオブジェクト
 * イベントハンドラ関数の引数に渡されるイベント情報を格納したオブジェクト。
 * すべてのイベントオブジェクトはイベントタイプ`type`とイベントターゲット`target`を持つ。
 * - イベント伝搬
 * ブラウザがどのオブジェクトに対してイベントハンドラを呼び出すか決定すること。
 * HTMLドキュメント中の要素に対してある種のイベントが発生した場合は、イベントがドキュメントのツリー構造おw伝搬していく。
 * イベントの伝搬を止めるにはあるメソッドを呼びだす。
 * また、イベントキャプチャリングと呼ばれる、イベントが発生したターゲットにイベントが届けられる前にイベントを横取りする方法もある。
 * イベントによってはデフォルト動作があるものもあり、イベントのキャンセルが必要な場合もある。
 * 
 * ### 15.2.1 イベントの分類
 * - デバイス依存の入力イベント
 * マウスやキーボードなど、ある特定の入力デバイスに関連づけられたイベント。
 * mousedown, mousemove, mouseup, touchstart, touchmove, touchend, keydown, keyupなど
 * - デバイス独立の入力イベント
 * 特定の入力デバイスに直接関連づけられていないイベント。
 * click, input, pointerdown, pointermove, pointerupなど
 * - UIイベント
 * 高レベルイベント。Webアプリケーション上のUIを定義するHTMLフォーム要素上で発生する。
 * focus, change, submitなど
 * - 状態変化イベント
 * ネットワークやブラウザの振る舞いで発生するイベント。
 * `document`の`DOMContentLoaded`イベントや`window`の`load`イベントなど。
 * - API固有のイベント
 * HTMLや関連する仕様では多くのWebAPIが定義されている。このWebAPIでは独自のイベントタイプが含まれる。
 * <video>や<audio>のwaiting, playing, seeking, vlumnechangeなど。
 * 
 * ### 15.2.2 イベントハンドラの登録
 * ２つの方法がある。この２つは両立し、互いに影響しない。
 * - イベントターゲットとなるオブジェクトやドキュメント要素のプロパティに設定する。
 * - オブジェクトや要素の`addEventListener`に登録する。
 * <button id="mybutton">Click me</button>
 * <script>
 * let b = document.querySelector("#mybutton");
 * b.onclick = function() { console.log("Thanks for clicking me!"); };
 * b.addEventListener("click", () => { console.log("Thanks again!"); });
 * </script>
 */
// Windowオブジェクトのonloadプロパティに関数を設定する。
// この関数がイベントハンドラになる。ドキュメントが読み込まれたときに呼び出される。
window.onload = function() {
    // <form> 要素を検索する。
    const form = document.querySelector("form#shipping");
    // イベントハンドラ関数を登録し、フォーム送信直前に、呼び出される
    // ようにする。isFormValid()は別の場所で定義されていると想定。
    form.onsubmit = function(event) {   // ユーザがフォームを送信するとき、
        if (!isFormValid(this)) {       // フォーム入力が正しいかどうかをチェックし、
            event.preventDefault();     // 正しくない場合は、フォーム送信を中止する。
        }
    };
};
/**
 * #### 15.2.2.3 addEventListener
 * 第一引数にはイベントタイプ、第二引数にはコールバック関数、第三引数にはキャプチャリングするかどうかを設定できる。
 * 第三引数には論理値（trueの場合にキャプチャリングする）あるいは下記のようなオブジェクトを設定できる。
 * - capture - trueの場合、キャプチャリングをおこなう。
 * - once - イベントが一度発生したら自動でイベントリスナーは削除される。
 * - passive - trueの場合、デフォルトのアクションをキャンセルしない（`preventDefault`を呼ばない）
 */
document.addEventListener("click", handleClick, {
    capture: true,
    once: true,
    passive: true
});

/**
 * ### 15.2.3 イベントハンドラ呼び出し
 * イベントハンドラが呼び出されるときは、唯一の引数としてイベントオブジェクトが渡される。
 * - type
 * 発生したイベントの種類
 * - target
 * イベントが発生したオブジェクト
 * - currentTarget
 * 伝搬するイベント用に現在のイベントハンドラが登録されているオブジェクト
 * - timeStamp
 * イベントが発生した時刻のタイムスタンプ。
 * - isTrusted
 * イベントがWebブラウザ自身からdispatchされたか。JavaScriptのコードからdispatchされた場合はfalse。
 * 
 * #### 15.2.3.2 イベントハンドラのコンテキスト
 * イベントハンドラ(function)のthisはイベントターゲット。ただし、アロー関数の場合はアロー関数が定義されたスコープのthis。
 * 
 * #### 15.2.3.3 イベントハンドラの戻り値
 * 基本的には返さないが、falseを返すとデフォルトアクションを行わないようにできる。（通常はpreventDefaultを呼び出すこと。）
 * 
 * ### 15.2.4 イベント伝搬
 * イベントダーゲットがDocumentやドキュメント要素の場合、イベントはDOMツリーを伝搬する。
 * イベントターゲット -> 親の要素 -> 親の親の要素 -> ... -> Documentオブジェクト -> Windowオブジェクト
 * これにより、<form>要素の`change`ハンドラを登録することで、フォーム中のすべての要素にイベントハンドラを登録する必要がなくなる。
 * 例外) fucus、blur、scrollイベントはデフォルトでは伝播しない。また、DocumentのloadイベントはWindowオブジェクトには伝播しない。
 * 
 * イベント伝搬のフェーズ
 * 1. キャプチャリング
 * `addEventListener`の第三引数でキャプチャリングを有効にしている場合。Windowオブジェクトのキャプチャリングハンドラから順にDOMツリーを下がっていく。
 * イベントターゲット自体のキャプチャリングイベントハンドラは呼び出されない。
 * 2. イベントターゲットのハンドラ呼び出し
 * 3. イベントの伝搬
 * 
 * ### 15.2.5 イベントのキャンセル
 * - イベントオブジェクトのpreventDefaultを呼び出してデフォルト動作をキャンセルする
 * - stopPropagationで伝搬を抑止する
 * - stopImmediatePropagationで伝搬を抑止する（stopImmediatePropagation()メソッドは、同じオブジェクトに登録されているイベントハンドラの呼び出しも抑止します。）
 * 
 * ### 15.2.6 カスタムイベントのディスパッチ
 * イベントターゲットは`dispatchEvent`メソッドをもつ。`dispatchEvent`には`CustomEvent`コンストラクタを使って作成した独自オブジェクトを渡すことができる。
 * ※第二引数のオブジェクトにbubbles: trueを追加すると、伝搬するようになる。
 * 
 */
// カスタムイベントをディスパッチし、ビジー状態であることをUIに通知する。
document.dispatchEvent(new CustomEvent("busy", { detail: true }));

// ネットワーク処理を行う。
fetch(url)
  .then(handleNetworkResponse)
  .catch(handleNetworkError)
  .finally(() => {
      // ネットワークリクエストが成功または失敗したら、別のイベントを
      // ディスパッチして、ビジー状態ではなくなったことをUIに通知する。
      document.dispatchEvent(new CustomEvent("busy", { detail: false }));
  });

// ほかの場所で、プログラム中から「busy」イベントに対してハンドラを登録し、
// このイベントハンドラを使ってスピナーを表示したり隠したりすることでユーザに通知する。document.addEventListener("busy", (e) => {
    if (e.detail) {
        showSpinner();
    } else {
        hideSpinner();
    }
});

