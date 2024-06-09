

/**
 * 0から順にカウントアップするジェネレータを生成する関数。
 * 生成したジェネレータで`throw`を呼ぶとリセットして0からカウントアップを開始する。
 */
export function* countGen() {
    let reset = false
    let i = 0;
    while(true) {
        try {
            if (reset) {
                i = 0;
                reset = false
                yield i;
            } else {
                yield i++;
            }
        } catch(e) {
            reset = true;
        }
    }
}