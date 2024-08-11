(function updateClock() { // SVG時計の画像を更新して現在時刻を表示する。
    let now = new Date();                                     // 現在時刻。
    let sec = now.getSeconds();                               // 秒。
    let min = now.getMinutes() + sec/60;                      // 小数部を持つ分。
    let hour = (now.getHours() % 12) + min/60;                // 小数部を持つ時。
    let minangle = min * 6;                                   // 1分あたり6度。
    let hourangle = hour * 30;                                // 1時間あたり30度。
  
    // 時計の針のSVG要素を取得する。
    let minhand = document.querySelector("#clock .minutehand");
    let hourhand = document.querySelector("#clock .hourhand");

    const sechandX2 = 50 + 35 * Math.sin(Math.PI * sec / 30);
    const sechandY2 = 50 - 35 * Math.cos(Math.PI * sec / 30);
    const sechand = document.querySelector("#clock .sechand");
    if (sechand == null) {
      const secLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      secLine.setAttribute('x1', 50);
      secLine.setAttribute('y1', 50);
      secLine.setAttribute('x2', sechandX2);
      secLine.setAttribute('y2', sechandY2);
      secLine.setAttribute('stroke-width', 2);
      secLine.setAttribute("class", "sechand");
      const hands = document.querySelector(".hands");
      hands.appendChild(secLine);
    } else {
      sechand.setAttribute("x2", sechandX2);
      sechand.setAttribute("y2", sechandY2);
    }
  
    // SVG属性を設定して、時計盤の中で回転する。
    // transformはSVGの属性であることに注意すること。通常のCSSのrotateは引数を１つしか受け付けない。
    minhand.setAttribute("transform", `rotate(${minangle},50,50)`);
    hourhand.setAttribute("transform", `rotate(${hourangle},50,50)`);
  
    // 10秒後にこの関数を再度実行する。
    setTimeout(updateClock, 1000);
  }()); // ここで関数を即座に実行していることに注意。