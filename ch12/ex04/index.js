
/**
 * 素数を無限に算出するジェネレータ関数
 */
export function* primeNumberGen() {
    let coefficient = 1
    let nextStartNum = 0;
    while (true) {
        const numbers = new Array(coefficient * 100).fill(true); // i番目の要素の値はiとする
        numbers[0] = false;
        numbers[1] = false;
        let p = 0
        let primeNums;
        while(true) {
            for(let i = p; i < numbers.length; i++) {
                if (numbers[i]) {
                    p = i;
                    break;
                }
            }
            for(let i = p ** 2; i < numbers.length; i++) {
                if (i % p === 0) {
                    numbers[i] = false
                }
            }
            if (p > Math.sqrt(numbers.length - 1)) {
                primeNums = numbers.reduce((acc, current, index) => {
                    if (current) {
                        acc.push(index);
                    }
                    return acc;
                }, [])
                break;
            }
            p++
        }
        for (const prime of primeNums) { 
            if (prime >= nextStartNum) {
                yield prime 
            }
        }
        nextStartNum = numbers.length
        coefficient *= 2
    }
    
}