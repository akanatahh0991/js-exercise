const clock = setInterval(() => {
    console.clear();
    console.log(new Date().toLocaleTimeString())
}, 1000);


setTimeout(() => {clearInterval(clock)}, 10000)