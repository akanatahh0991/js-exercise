```js

async function h1() {
  // 回答:
  // ３秒後にAが出力、その２秒後にBが出力、さらにその１秒後にCが出力される。
  //
  // 説明:
  // wait3、logA、wait2、logB、wait1、logCが順々に実行される
  //
  // 図解:
  // wait3
  // |----------|
  //            logA
  //            |-|
  //              wait2
  //              |--------|
  //                       logB
  //                       |-|
  //                         wait1
  //                         |----|
  //                              logC
  //                              |-|
  //   
  try {
    await wait3();
    logA();
    await wait2();
    logB();
    await wait1();
    logC();
  } catch (e) {
    log(e.message);
  }
}


function h2() {
  // NOTE: h3 との比較用
  // 回答：
  // Xと出力される。
  // 説明：
  // errXでPromiseが満たされ、catchが動作してXが出力される。
  // 図解：
  // errX
  // |-|
  //   e.message
  //   |-|
  new Promise(() => {
    errX();
  }).catch((e) => log(e.message));
}

function h3() {
  // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
  // 回答：
  // errXでエラー終了する
  // 説明：
  // errXが実行されているPromiseに対してcatchは実行されないため、エラー終了する
  // 図解：
  // errX
  // |-|
  new Promise(async () => {
    errX();
  }).catch((e) => log(e.message));
}

async function h4() {
  // NOTE: 2つの例外は両方 catch できるか？
  // 回答：
  // 1秒後にerrorYでエラー終了する
  // 説明：
  // p1とp2の解決後、p1の完了待ちの途中でerrorYによりp2内でエラー終了する。
  // 図解：
  // wait2
  // |---------|
  // wait1
  // |----|
  //      errY
  //      |-|
  try {
    const p1 = wait2().then(() => {
      errX();
    });
    const p2 = wait1().then(() => {
      errY();
    });
    await p1;
    await p2;
  } catch (e) {
    log(e.message);
  }
}
```