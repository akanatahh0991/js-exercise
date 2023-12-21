import fs from "fs";
import readline from "readline";

/**
 * キーがマップ上に存在しない場合に、コンストラクタで指定したデフォルト値を返すMap。
 */
class DefaultMap extends Map {
  constructor(defaultValue) {
    super();
    this.defaultValue = defaultValue;
  }
  get(key) {
    if (this.has(key)) {
      return super.get(key);
    } else {
      return this.defaultValue;
    }
  }
}

/**
 * 文字頻度ヒストグラムを生成するクラス。
 */
class Histogram {
  constructor() {
    /**
     * 文字と文字数のマップ
     */
    this.letterCounts = new DefaultMap(0);
    /**
     * 全体の文字数
     */
    this.totalLetters = 0;
  }

  /**
   * 文字頻度ヒストグラムにtextを追加する。
   * @param {string} text
   */
  add(text) {
    text = text.replace(/\s/g, "").toUpperCase();
    for (let character of text) {
      let count = this.letterCounts.get(character);
      this.letterCounts.set(character, count + 1);
      this.totalLetters++;
    }
  }

  /**
   * 文字頻度ヒストグラムを以下の形式で文字列として生成します。
   * 文字：#(全文に占める文字の頻度の%表示を四捨五入した数表示) 全文に占める文字の頻度の%表示
   *
   * - 表示例
   * の: ##### 4.79
   * @returns 文字頻度ヒストグラムの文字列
   */
  toString() {
    let entries = [...this.letterCounts];
    entries.sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0] < b[0] ? -1 : 1;
      } else {
        return b[1] - a[1];
      }
    });

    for (let entry of entries) {
      entry[1] = (entry[1] / this.totalLetters) * 100;
    }

    entries = entries.filter((entry) => entry[1] >= 1);

    let lines = entries.map(
      ([l, n]) => `${l}: ${"#".repeat(Math.round(n))} ${n.toFixed(2)}`
    );
    return lines.join("\n");
  }
}

/**
 * コンソールに入力した絶対パスにあるテキストファイルをUTF-8で読み込んで
 * 文字頻度ヒストグラムをコンソールに表示します。
 * ファイルの読込失敗時にはファイルの読込エラーがコンソールに表示されます。
 */
async function displayHistogramFromInputtedTextFile() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "文字頻度ヒストグラムを表示するファイルの絶対パスを入力してください。",
    (filePath) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error("ファイルの読み込みのエラー:", err);
        } else {
          const histogram = new Histogram();
          histogram.add(data);
          console.log(histogram.toString());
        }
        rl.close();
      });
    }
  );
  rl.on("close", () => {
    console.log("プログラムを終了します。");
    process.exit(0);
  });
}

displayHistogramFromInputtedTextFile();
