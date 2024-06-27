/**
 * ## 14.5 テンプレートタグ
 * テンプレートリテラルを関数式の後におく場合、
 * 第一引数には文字列の配列(※1 rawプロパティも保持する)
 * 第二引数には補間値
 * が格納される。
 * n個の補間値がある場合、最初の引数にはn+1個の文字列が格納される。
 * 
 */
function html(strings, ...values) {
    // それぞれの値を文字列に変換し、エスケープする。
    const escaped = values.map(v => String(v)
                                    .replace("&", "&amp;")
                                    .replace("<", "&lt;")
                                    .replace(">", "&gt;")
                                    .replace('"', "&quot;")
                                    .replace("'", "&#39;"));

    // 文字列とエスケープした値を結合して返す。
    let result = strings[0];
    for(let i = 0; i < escaped.length; i++) {
        result += escaped[i] + strings[i+1];
    }
    return result;
}

const operator = "<";
console.log(html`<b>x ${operator} y</b>`)                // => "<b>x &lt; y</b>"

const kind = "game", name = "D&D";
console.log(html`<div class="${kind}">${name}</div>`)    // =>'<div class="game">D&amp;D</div>'

function tag(){
    // rawプロパティは表示されない
    console.log(arguments);
}
tag`\\ジャバ${true}スク${1+2}リプト`;