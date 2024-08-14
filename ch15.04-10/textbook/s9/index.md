## 15.9 オーディオAPI
`<audio>`と`<video>`タグをつけると、Webページにサウンドやビデオを簡単に含めることができる。
- `play`, `pause` - 再生と停止
- `currentTime` - 設定した時間までのスキップ

### 15.9.1 Audioコンストラクタ
効果音を動的に流す方法。`cloneNode`することで複数回クリックした場合など、複数の効果音を同時に再生できるように複数の`Audio`要素を使用する。
```javascript
// あらかじめ効果音を読み込んでおけば、すぐに使えます。
let soundeffect = new Audio("soundeffect.mp3");

// ユーザがマウスボタンをクリックするたびに効果音を再生する。
document.addEventListener("click", () => {
    soundeffect.cloneNode().play(); // 音を読み込んで再生する。
});
```
### 15.9.2 WebAudio API
合成音の作成と再生をおこなうAPI。電子音楽や信号処理の概念について知識が必要。
```javascript
// まず、audioContextオブジェクトを作成する。Safariでは、AudioContextの
// 代わりにwebkitAudioContextを使わなければならない。
let audioContext = new (this.AudioContext||this.webkitAudioContext)();

// ベースとなる音を3つの正弦波の組み合わせとして定義する。
let notes = [ 293.7, 370.0, 440.0 ]; // Dメジャーコード: D、F#、A。

// 再生したい音ごとにオシレーターノードを作る。
let oscillators = notes.map(note => {
    let o = audioContext.createOscillator();
    o.frequency.value = note;
    return o;
});

// 時間によって音の大きさを制御することで、音の形を整える。
// 時間0からすぐに最大音量になるようにする。
// その後、時間0.1からゆっくりと0まで音量を下げていく。
let volumeControl = audioContext.createGain();
volumeControl.gain.setTargetAtTime(1, 0.0, 0.02);
volumeControl.gain.setTargetAtTime(0, 0.1, 0.2);

// 音をデフォルトの到達先に送ろうとしている。
// デフォルトはユーザのスピーカー。
let speakers = audioContext.destination;

// ソースの音それぞれをボリュームコントロールに接続する。
oscillators.forEach(o => o.connect(volumeControl));

// そして、ボリュームコントロールの出力をスピーカーに接続する。
volumeControl.connect(speakers);

// ここでサウンドの再生を開始し、1.25秒再生する。
let startTime = audioContext.currentTime;
let stopTime = startTime + 1.25;
oscillators.forEach(o => {
    o.start(startTime);
    o.stop(stopTime);
});

// 音を連続して再生したい場合は、イベントハンドラを使う。
oscillators[0].addEventListener("ended", () => {
  // このイベントハンドラは、音の再生が停止したときに呼び出される。
});
```