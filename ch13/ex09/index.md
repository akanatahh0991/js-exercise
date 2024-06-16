```js
async function i1() {
  // NOTE: any で1つ Promise が解決された時に他の Promise はどうなるだろうか
  // 回答：
  // 1秒後に42、2秒後に100と出力される。
  // 説明：
  // １つ目のPromiseと２つ目のPromiseは並行に実行される。１つ目のPromiseでPromise.anyは解決されるため、logvで42が表示される。Promise.anyで実行した２つ目の処理が止まるわけではないので、vに100が代入され、２秒後に100と出力される。
  //        
  let v = 0;

  v = await Promise.any([
    wait1().then(() => 42),
    wait2()
      .then(() => (v = 100))
      .then(() => 0),
  ]);

  log(v);
  await wait2();
  log(v);
}

async function i2() {
  // 回答：
  // 1秒後にC、2秒後にB、3秒後にAが出力された後、[A, B, C]が出力される。
  // 説明：
  // Promise.allによって３つのプロミスは並行に動作する。そのため、wait1の処理後にlogC、wait2の処理後にlogB、wait3の処理後にlogCが実行される。また、最終結果はそれぞれのプロミスを満たした値であるA, B, Cが配列となって格納される。
  // 
  const v = await Promise.all([
    wait3().then(() => {
      logA();
      return "A";
    }),
    wait2().then(() => {
      logB();
      return "B";
    }),
    wait1().then(() => {
      logC();
      return "C";
    }),
  ]);
  log(v);
}

async function i3() {
  // NOTE: all で引数の1つが失敗すると他の Promise はどうなるだろうか
  // 回答：
  // １秒後にY、４２が出力され、２秒後にB、４秒五に0が出力される
  // 説明：
  // ３つのPromiseはPromise.allで並行に実行される。wait1の処理が最初に終わるため、Promise.allはerrYにより満たされ、log(e.message)とlogvが実行される。Promise.allの中で渡した処理自体は動いているので、wait2の実行後logB、wait3の実行後にv=0となる。そのため、Bとv=0が出力される。
  // 図解：
  // wait3
  // |------------|
  //              v=0
  //              |-|
  // wait2
  // |--------|
  //          logB
  //          |-|
  // wait1
  // |---|
  //     errY
  //     |-|
  //       e.message(Yと出力)
  //       |-|
  //         logv(42と出力)
  //         |-|
  //           wait3
  //           |--------------|
  //                          logv(0と出力)
  //                          |-|
  let v = 42;
  try {
    await Promise.all([
      wait3().then(() => {
        v = 0;
        errX();
      }),
      wait2().then(() => {
        logB();
        return "B";
      }),
      wait1().then(() => {
        errY();
      }),
    ]);
  } catch (e) {
    log(e.message);
    log(v);
    await wait3();
    log(v);
  }
}

async function i4() {
  // NOTE: i5, i6 との比較用 (直列に処理を実行したいものとする)
  // 回答：
  // ５秒後に0、その4秒後に1、その３秒後に2、その２秒後に3、その１秒後に４とCOMPLETEDが出力される。
  // 説明：
  // 前のPromiseが終了を待って直列実行される。
  // 
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(() => wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}

async function i5() {
  // NOTE: このコードは期待通りの挙動をすると考えられるだろうか？(典型的なミス)
  // 回答：
  // COMPLETEDの出力のあと、１秒ごとに4, 3, 2, 1, 0が出力される。
  // 説明：
  // p.then(wait)の部分がPromiseを返していないため、直列で実行されていない。そのため、すぐにpは解決されてCOMPLETEDが出力される。その後、並列に実行されたPromiseがログ出力する。
  // 
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}

async function i6() {
  // 回答：
  // 4, 3, 2, 1, 0が１秒ごとに出力された後、COMPLETEDが出力される。
  // 説明：
  // Promise.allにはそれぞれ１秒後に4、２秒後に3、３秒後に2、4秒後に1、５秒後に0を出力するPromiseが渡され、それぞれ実行される。すべてのPromiseが完了した後にlog("COMPLETED")が実行される。
  // 
  return Promise.all(
    [0, 1, 2, 3, 4].map((i) => wait((5 - i) * 1000).then(() => log(i)))
  ).then(() => log("COMPLETED"));
}

async function i7() {
  // NOTE: i8 との比較用
  // 回答：
  // 11秒後に10と出力される。
  // 説明：
  // p1は1, 3, 5, 7, 9秒後にvを1加算する。p2は0, 2, 4, 6, 8秒後にvを1加算する。p1とp2をPromise.allで待つことにより、最終的にv=10となる。
  // 図解：
  // 
  let v = 0;

  // 1秒待った後に2秒間隔で value の値を更新
  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  // 2秒間隔で value の値を更新
  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}

async function i8() {
  // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
  // 回答：
  // ５が出力される。
  // 説明：
  // p1はp2によって加算される前にnextに値を格納するため、５までしか増えない。
  // 図解：
  // 以下の繰り返し。
  // wait1
  // |----|
  //      next=1
  //      |-|
  //        wait2
  //        |-------|
  //                v=1
  //                |-|
  // next=1
  // |-|
  //   wait2
  //   |-------|
  //           v=1
  //           |-|
  // 
  let v = 0;

  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      // NOTE: value の読み込み (value + 1) と書き込み (value = ...) の間に await が...
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}
```