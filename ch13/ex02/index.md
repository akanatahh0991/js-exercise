```js
function f3() {
  // NOTE: then のコールバック内の例外は try/catch でキャッチできるだろうか
  // 回答:
  // すぐにCが出力された後、A が出力され、ErrorXが発生して終了する。
  //
  // 説明:
  // wait(0)の解決を待たずに、fillalyブロックのlogC()が実行される。その後、wait(0)の解決後に logA が実行され、wait2().then(errX) の解決後 に ErroXがthrowされるが、既に同期処理のtry-catch-finallyは抜けているため、エラーで終了する。
  //
  // 図解:
  // logC
  // |-|
  //   wait0
  //   |-|
  //     logA
  //     |-|
  //       
  try {
    wait(0).then(logA).then(errX);
  } catch (e) {
    logB();
  } finally {
    logC();
  }
}

function f4() {
  // NOTE: f5 との比較用
  // 回答:
  // 2秒後にAが出力された後、1秒後にBが出力され、100が出力される。
  //
  // 説明:
  // wait2の解決後、logAが実行され、wait(1000)の解決後に logB が実行される。その後、100がthenブロックに渡り、100が出力される。
  //
  // 図解:
  // wait2
  // |---|
  //     logA
  //     |-|
  //       wait(1000)
  //       |--|
  //          logB
  //          |-|
  //            log(v)
  //            |-|
  //
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then((value) =>
      wait(1000).then(() => {
        logB();
        return 100;
      })
    )
    .then((v) => log(v));
}

function f5() {
  // NOTE: 2つ目の then の引数が関数でなく Promise になっている (典型的なミス)
  // 回答:
  // 1秒後にBが出力された後、さらに1秒後にAが出力され、40が出力される。
  //
  // 説明:
  // wait2が指定されているが、２つ目のthenにPromiseが指定されているため1秒後にlogBが実行される。さらに１秒後、wait2が解決してlogAが実行され、40がlog(v)で出力される
  //
  // 図解:
  // wait2
  // |----------|
  //  wait(1000)
  //  |--|
  //     logB
  //     |-|
  //            logA
  //            |-|
  //              log(v)
  //              |-|
  //
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then(
      wait1().then(() => {
        logB();
        return 100;
      })
    )
    .then((v) => log(v));
}

function f6() {
  // NOTE: 1つの Promise に対し then を2回呼び出すとどうなるか
  // 回答:
  // 1秒後にAが出力された後、さらに1秒後にBが出力され、さらに１秒後にCが出力される。
  //
  // 説明:
  // wait1の解決後にlogAが実行され解決された後、wait1とwait2がそれぞれ実行される。wait1の処理が解決されlogBが実行され、wait2の処理が解決されてlobCが実行される。
  //
  // 図解:
  // wait1
  // |--|
  //    logA
  //    |--|
  //       wait1
  //       |--|
  //          logB
  //          |-|
  //       wait2
  //       |----|
  //            logC
  //            |-|
  //
  const p = wait1().then(logA);
  p.then(() => wait1()).then(logB);
  p.then(() => wait2()).then(logC);
}

function f7() {
  // NOTE: 2つ目の wait の引数が実行される差には p は解決済み
  // (= 解決済みの Promise の then を呼び出すとどうなるか)
  // 回答:
  // 1秒後にAが出力された後、さらに1秒後にBが出力され、Cが出力される。
  //
  // 説明:
  // wait1の解決を待たずにwait2は実行される。wait1の解決後にlogAが実行される。wait2の解決後に、pはすでに解決済みのためlogBが実行されその後logCが実行される。
  //
  // 図解:
  // wait1
  // |--|
  //    logA
  //    |-|
  // wait2
  // |----|
  //      logB
  //      |-|
  //        logC
  //        |-|
  //
  const p = wait1().then(logA);
  wait2()
    .then(() => {
      return p.then(logB);
    })
    .then(logC);
}

function f8() {
  // NOTE: f9, f10 との比較用
  // 回答:
  // 1秒後にXが出力された後、Aが出力される。
  //
  // 説明:
  // wait1の解決後、errXが実行されエラーがthrowされてcatchで指定したエラー出力が実行される。その後、finallyで指定したlogAが実行される。
  //
  // 図解:
  // wait1
  // |--|
  //    errX
  //    |-|
  //      log(e.message)
  //      |-|
  //        logA
  //        |-|
  //
  wait1()
    .then(errX)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

function f9() {
  // NOTE: f12 との比較用
  // 回答:
  // 1秒後にYが出力された後、Aが出力される。
  //
  // 説明:
  // wait1の解決後、一つ目のthenで指定した処理が実行される。その後errYが実行されエラーがthrowされてcatchで指定したエラー出力が実行される。その後、finallyで指定したlogAが実行される。
  //
  // 図解:
  // wait1
  // |--|
  //    ()=>42
  //    |-|
  //      errY
  //      |-|
  //        log(e.message)
  //        |-|
  //          logA
  //          |-|
  //
  wait1()
    .then(() => 42)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

function f10() {
  // NOTE: then(r, c) と then(r).catch(c) は等しいか？
  // 回答:
  // 1秒後にAが出力された後、エラー終了する。
  //
  // 説明:
  // wait1の解決後、一つ目のthenで指定した処理が実行される。その後errYが実行されエラーがthrowされ、finallyで指定したlogAが実行される。log(e.message)は実行されず、エラー終了する。
  //
  // 図解:
  // wait1
  // |--|
  //    ()=>42
  //    |-|
  //      errY
  //      |-|
  //        log(A)
  //        |-|
  //
  wait1()
    .then(() => 42)
    .then(errY, (e) => log(e.message))
    .finally(logA);
}

function f11() {
  // f12 との比較用: new Promise 内の throw は .catch でキャッチできるか？
  // 回答:
  // Xが出力される。
  //
  // 説明:
  // errXによりthrowされたエラーをcatchで指定したメッセージ表示処理により出力する。
  //
  // 図解:
  // errx
  // |--|
  //    log(e.message)
  //    |-|
  //
  new Promise((resolve, reject) => {
    errX();
  }).catch((e) => log(e.message));
}

function f12() {
  // new Promise 内だがコールバック関数で throw した場合は？
  // 回答:
  // エラー終了する。
  //
  // 説明:
  // setTimeoutが呼ばれた時点でエラーは発生していないため、catcできずerrXが実行されてエラー終了する。。
  //
  // 図解:
  // setTimeout
  // |--|
  //    throw ErrorX
  //    |-|
  //
  new Promise((resolve, reject) => {
    setTimeout(() => errX(), 0);
  }).catch((e) => log(e.message));
}
```