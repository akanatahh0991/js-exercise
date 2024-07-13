// 要素eのテキストコンテンツを返す。子要素についても再帰的に行う。
// このメソッドはtextContentプロパティと同じ働きをする。
function textContent(e) {
    let s = "";                         // この変数にテキストを集める。
    for(let child = e.firstChild; child !== null; child = child.nextSibling) {
        let type = child.nodeType;
        if (type === 3) {               // Textノードであれば、
            s += child.nodeValue;       // テキストコンテンツを文字列に連結していく。
        } else if (type === 1) {        // Elementノードであれば、
            s += textContent(child);    // 再帰的に処理を行う。
        }
    }
    return s;
}

/**
 * TOC.js: ドキュメントの目次を生成する。
 *
 * このスクリプトはDOMContentLoadedイベントが発生したときに
 * 実行される。ドキュメントの目次を自動的に生成する。グローバルな
 * シンボルは定義しないので、ほかのスクリプトと一緒に使っても
 * 問題は起こらない。
 *
 * このスクリプトを実行すると、まず、"TOC"というidを持つ要素を探す。
 * もし、そのような要素がない場合は、ドキュメントの先頭に目次を作成する。
 * 次に、この関数では<h2>から<h6>までをすべて検索し、このタグの
 * コンテンツを節見出しとして扱い、TOC要素中に目次を作成する。
 * すべての節見出しに、章番号を追加し、見出しを名前付きアンカーで囲む。
 * こうすることで、目次から各節見出しにリンクを設定できる。
 * 自動作成されるアンカーには、「TOC」から始まる名前を付ける。
 * このため、HTML中ではTOCから始まる名前を使わないようにする。
 *
 * 自動生成された目次の各項目は、CSSでスタイルを設定できる。すべての項目は、
 *「TOCEntry」というクラスを持つ。各項目は、節見出しのレベルに応じたクラス
 * も持つ。例えば、<h2>タグは、「TOCLevel1」というクラスを持つ。<h3>タグは、
 *「TOCLevel2」というクラスを持つ。以下同様。「TOCSecNum」というクラスを持つ
 * 項目については、節番号も挿入される（訳注：このスクリプトでは、<h1>を
 * ドキュメントのタイトルとして扱い、<h2>が章見出しとなるためレベルが-1される）
 *
 * このモジュールを使うときには、次のようなスタイルシートを用意する。
 *
 *   #TOC { border: solid black 1px; margin: 10px; padding: 10px; }
 *   .TOCEntry { margin: 5px 0px; }
 *   .TOCEntry a { text-decoration: none; }
 *   .TOCLevel1 { font-size: 16pt; font-weight: bold; }
 *   .TOCLevel2 { font-size: 14pt; margin-left: .25in; }
 *   .TOCLevel3 { font-size: 12pt; margin-left: .5in; }
 *   .TOCSectNum:after { content: ": "; }
 *
 * 章番号を表示したくない場合は、次のようなスタイルを使う。
 *
 *   .TOCSectNum { display: none }
 **/
 document.addEventListener("DOMContentLoaded", () => {
    // 目次を格納する要素を検索する。
    // もしなければ、ドキュメントの先頭に作成する。
    let toc = document.querySelector("#TOC");
    if (!toc) {
        toc = document.createElement("div");
        toc.id = "TOC";
        document.body.prepend(toc);
    }

    // すべての節見出し要素を検索する。このスクリプトでは、<h1>は
    // ドキュメントのタイトルのために使われ、<h2>から<h6>までが
    // ドキュメント中の章のために使われると想定している。
    let headings = document.querySelectorAll("h2,h3,h4,h5,h6");

    // 章番号を記憶する配列を初期化する。
    let sectionNumbers = [0,0,0,0,0];

    // 発見した節見出し要素を巡回する。
    for(let heading of headings) {
        // TOCコンテナ中の節見出しはスキップする。
        if (heading.parentNode === toc) {
            continue;
        }

        // 見出しのレベルを取得する。
        // <h2>がレベル1見出しになるので、1を減算する。
        let level = parseInt(heading.tagName.charAt(1)) - 1;

        // この見出しレベルの章番号をインクリメントする。
        // また、このレベルより下のレベルの章番号を0に初期化する。
        sectionNumbers[level-1]++;
        for(let i = level; i < sectionNumbers.length; i++) {
            sectionNumbers[i] = 0;
        }

        // ここで、すべてのレベルの章番号を組み合わせて
        // 2.3.1 のような章番号を生成する。
        let sectionNumber = sectionNumbers.slice(0, level).join(".");

        // 章番号を節見出しに追加する。
        // 章番号を<span>で囲み、スタイルを設定できるようにする。
        let span = document.createElement("span");
        span.className = "TOCSectNum";
        span.textContent = sectionNumber;
        heading.prepend(span);

        // 見出しを名前付きアンカーで囲み、リンクできるようにする。
        let anchor = document.createElement("a");
        let fragmentName = `TOC${sectionNumber}`;
        anchor.name = fragmentName;
        heading.before(anchor);    // 見出しの前にアンカーを挿入する。
        anchor.append(heading);    // その後、アンカーの中に見出しを移動する。

        // この節へのリンクを作成する。
        let link = document.createElement("a");
        link.href = `#${fragmentName}`;     // リンクの飛び先。

        // リンク中に見出しをコピーする。信頼できない文字列は
        // 挿入していないので、安全にinnerHTMLを使用できる。
        link.innerHTML = heading.innerHTML;

        // リンクをdivで囲み、レベルに応じてスタイルを指定できるようにする。
        let entry = document.createElement("div");
        entry.classList.add("TOCEntry", `TOCLevel${level}`);
        entry.append(link);

        // このdivをTOCコンテナに追加する。
        toc.append(entry);
    }
});