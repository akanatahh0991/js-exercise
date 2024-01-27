const arry = ["r", "i", "c", "o", "h"];
delete arry[3];
console.log(arry[3]); // undefined
console.log(arry); // [ 'r', 'i', 'c', <1 empty item>, 'h' ]
console.log(arry.length); // 5