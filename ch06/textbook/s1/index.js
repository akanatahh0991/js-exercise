
/**
 * ハッシュ値を生成します。
 * @param {string} key
 * @returns ハッシュ値 
 */
function hash(key) {
  let hashValue = 0;
  for (const char of key) {
    //console.log(char.charCodeAt(0));
    hashValue += char.charCodeAt(0);
  }
  return hashValue;
}



console.log(hash("Apple"));
console.log(hash("key1"));
console.log(hash("key2"));

const arry = ["Apple", "Banana", "Orange"];
console.log(arry[2]);