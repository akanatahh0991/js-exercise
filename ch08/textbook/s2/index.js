const o = {
  m: function() {
    const self = this;
    console.log(this === o); // true

    // function f() {
    //   // 外側のthisを継承しないため、falseとundefinedになる
    //   console.log(this === o, this);
    //   console.log(self === o); // true
    // }
    // アロー関数は外側のthisを継承する
    const f = () => {
      console.log(this === o); // true
      console.log(self === o); // true
    }
    f();
  }
}
o.m();