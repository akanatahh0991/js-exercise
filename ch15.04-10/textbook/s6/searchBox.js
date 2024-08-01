/**
 * このクラスは、<input>テキスト入力フィールドと、2つのアイコンまたは絵文字を
 * 表示するカスタムHTML <search-box>要素を定義する。デフォルトでは、テキスト
 * 入力フィールドの左側に虫眼鏡の絵文字（検索を表す）、右側にXの絵文字（キャンセル
 * を示す）を表示する。テキスト入力フィールドのボーダーを隠し、2つの絵文字が
 * テキスト入力フィールドの内側に見えるようにボーダーを表示する。同じように、
 * テキスト入力フィールドにフォーカスが移動したときに、<search-box>の周りに
 * フォーカスリングを表示する。
 *
 * デフォルトのアイコンを上書きするには、<search-box>の子要素としてslot="left"
 * やslot="right"という属性を持つ<span>や<img>を含める。
 *
 * <search-box>は通常のHTMLのdisabledとhidden属性をサポートする。また、size属性と
 * placeholder属性を利用できる。それぞれ、<input>要素と同じ意味になる。
 *
 * 内部の<input>要素のinputイベントはバブリングし、targetフィールドに
 * <search-box>要素が設定された状態で現れる。
 *
 * ユーザが左側の絵文字（虫眼鏡）をクリックしたときに「search」イベントが発生
 * する。イベントのdetailプロパティには現在入力されている文字列が設定される。
 * 「search」イベントは、内部のテキスト入力フィールドが「change」イベントを
 * 発生したときにもディスパッチされる（「change」イベントは、テキストが変更
 * され、ユーザがリターンやタブを押下したときに発生する）。
 *
 * ユーザが右側の絵文字（X）をクリックしたときに「clear」イベントが発生する。
 * イベントハンドラがpreventDefault()を呼び出さなかった場合、ユーザの入力を
 * クリアしてイベントのディスパッチが完了する。
 *
 * なお、onsearchやonclearというプロパティや属性はない。
 * 「search」イベントと「clear」イベントに対するイベントハンドラを登録する
 * 場合は、addEventListener()を使う。
 */
class SearchBox extends HTMLElement {
    constructor() {
        super(); // スーパークラスのコンストラクタを呼び出す。最初に行わなければならない。

        // シャドウDOMツリーを作成し、シャドウDOMをこの要素に接続する。
        // this.shadowRootの値に設定する。
        this.attachShadow({mode: "open"});

        // このカスタムコンポーネント用の子孫要素やスタイルシートを定義している
        // テンプレートを複製し、コンテンツをシャドウルートに追加する。
        this.shadowRoot.append(SearchBox.template.content.cloneNode(true));

        // シャドウDOM中の重要な要素の参照を取得する。
        this.input = this.shadowRoot.querySelector("#input");
        let leftSlot = this.shadowRoot.querySelector('slot[name="left"]');
        let rightSlot = this.shadowRoot.querySelector('slot[name="right"]');

        // 内部の入力フィールドがフォーカスを得たり失ったりしたときに、
        // 「focused」属性を設定したり削除したりする。内部のスタイルシート
        // により、コンポーネント全体を囲むフォーカスリングを表示したり
        // 隠したりする。なお、「blur」イベントと「focus」イベントは
        // バブリングして、<search-box>から発生したイベントのように見える。
        this.input.onfocus = () => { this.setAttribute("focused", ""); };
        this.input.onblur = () => { this.removeAttribute("focused");};

        // ユーザが虫眼鏡をクリックした場合、「search」イベントを発生させる。
        // また、入力フィールドが「change」イベントを発生したときも、「search」
        // イベントを発生させる（「change」イベントは、シャドウDOMの外側には
        // バブリングしない。
        leftSlot.onclick = this.input.onchange = (event) => {
            event.stopPropagation();    // clickイベントがバブリングしないようにする。
            if (this.disabled) return;  // disabledのときは何もしない。
            this.dispatchEvent(new CustomEvent("search", {
                detail: this.input.value
            }));
        };

        // ユーザがXをクリックした場合、「clear」イベントを発生させる。
        // イベントに対してpreventDefault()が呼び出されなかった場合、入力をクリアする。
        rightSlot.onclick = (event) => {
            event.stopPropagation();    // clickイベントがバブリングしないようにする。
            if (this.disabled) return;  // disabledの場合何もしない。
            let e = new CustomEvent("clear", { cancelable: true });
            this.dispatchEvent(e);
            if (!e.defaultPrevented) {  // イベントが「キャンセル」されなかった場合、
                this.input.value = "";  // 入力フィールドをクリアする。
            }
        };
    }

    // 属性が設定されたり変更されたりしたときに、内部の<input>要素の対応する
    // 属性を設定する必要がある。後ほど設定する静的なobservedAttributes
    // プロパティと、このライフサイクルメソッドで処理を行う。
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "disabled") {
            this.input.disabled = newValue !== null;
        } else if (name === "placeholder") {
            this.input.placeholder = newValue;
        } else if (name === "size") {
            this.input.size = newValue;
        } else if (name === "value") {
            this.input.value = newValue;
        }
    }

    // 最後に、サポートするHTML属性に対応したプロパティに対して、ゲッターとセッター
    // を定義する。ゲッターは属性の値（または、属性の有無）を返すだけ。また、
    // セッターは属性の値（または、属性の有無）を設定するだけ。セッターが属性を
    // 変更するときに、ブラウザは自動的に前記したattributeChangedCallbackを
    // 自動的に呼び出す。

    get placeholder() { return this.getAttribute("placeholder"); }
    get size() { return this.getAttribute("size"); }
    get value() { return this.getAttribute("value"); }
    get disabled() { return this.hasAttribute("disabled"); }
    get hidden() { return this.hasAttribute("hidden"); }

    set placeholder(value) { this.setAttribute("placeholder", value); }
    set size(value) { this.setAttribute("size", value); }
    set value(text) { this.setAttribute("value", text); }
    set disabled(value) {
        if (value) this.setAttribute("disabled", "");
        else this.removeAttribute("disabled");
    }
    set hidden(value) {
        if (value) this.setAttribute("hidden", "");
        else this.removeAttribute("hidden");
    }
}

// この静的なフィールドは、attributeChangedCallbackメソッドで必要になる。
// この配列に含まれる名前の属性のものだけが、メソッド呼び出しのきっかけになる。
SearchBox.observedAttributes = ["disabled", "placeholder", "size", "value"];

// <template>要素を作成する。この要素は、スタイルシートと要素のツリーを
// 保持する。SearchBox要素のインスタンスで利用する。
SearchBox.template = document.createElement("template");

// このHTML文字列を解釈してテンプレートを初期化する。しかし、SearchBoxの
// インスタンスを作成するときには、テンプレートのノードを複製するだけ。
// HTMLを再度解釈する必要はない。
SearchBox.template.innerHTML = `
<style>
/*
 * :hostセレクタはライトDOMでの<search-box>要素を参照する。このスタイルは
 * デフォルトの設定。<search-box>のユーザはライトDOMのスタイルでオーバライド
 * できる。
 */
:host {
  display: inline-block;   /* デフォルトはインライン表示。 */
  border: solid black 1px; /* <input>と<slot>の周りを取り囲むボーダー。 */
  border-radius: 5px;
  padding: 4px 6px;        /* ボーダの内側に余白を入れる。 */
}
:host([hidden]) {          /* 丸括弧に注意：ホストにhiddenが設定されている場合 */
  display:none;            /* 属性を設定して表示しないようにする。 */
}
:host([disabled]) {        /* ホストがdiabled属性を持つ場合、 */
  opacity: 0.5;            /* グレー表示する。 */
}
:host([focused]) {         /* ホストがfocused属性を持つ場合、 */
  box-shadow: 0 0 2px 2px #6AE;  /* フォーカスリングを表示する。 */
}
/* 以下のスタイルシートは、シャドウDOM中の要素にのみ適用される。 */
input {
  border-width: 0;         /* 内部の入力フィールドのボーダーを隠す。 */
  outline: none;           /* フォーカスリングも隠す。*/
  font: inherit;           /* <input>要素はデフォルトではフォントを継承しない。 */
  background: inherit;     /* 背景色も同じ。*/
}
slot {
  cursor: default;         /* ボタン上のカーソルを矢印のポインタにする。 */
  user-select: none;       /* 絵文字をユーザが選択できないようにする。 */
}
</style>
<div>
  <slot name="left">\u{1f50d}</slot>  <!-- U+1F50Dは虫眼鏡。 -->
  <input type="text" id="input" />    <!-- 実際の入力要素。 -->
  <slot name="right">\u{2573}</slot>  <!-- U+2573はX。 -->
</div>
`;

// 最後に、customElement.define()を呼び出して、SearchBox要素を<search-box>タグの
// 実装として登録する。カスタム要素のタグ名にはハイフンが含まれていなければならない。
customElements.define("search-box", SearchBox);