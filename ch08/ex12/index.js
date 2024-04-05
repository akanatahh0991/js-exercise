/**
 * 無名関数の省略記法を表す。
 * `stringAction`には`$1`から`$10`までを用いて計算結果を表す式を表す文字列を指定できる。
 * 例えば、`(a, b) => a + b`に相当する`stringAction`は`$1 + $2`と表せる。
 * `$0`または`$11`以降を`stringAction`が含む場合`TypeError`がthrowされる。
 * @param {string} stringAction
 * @return {Function} 無名関数
 * @throws {TypeError} `$0`または`$11`以降を`stringAction`が含む場合にthrowされる。
 */
export const f = (stringAction) => {
  const argNums = stringAction
    .match(/\$\d+/g)
    ?.map((item) => parseInt(item.replace("$", "")));
  if (argNums === undefined) {
    return new Function(`return ${stringAction};`);
  }
  const maxArgNum = Math.max(...argNums);
  const minArgNum = Math.min(...argNums);
  if (minArgNum === 0 || maxArgNum > 10) {
    throw new TypeError(`Invalid stringAction : ${stringAction}`)
  }
  const args = []
  for (let i = 1; i <= maxArgNum; i++) {
    args.push(`$${i}`)
  }
  if (stringAction.includes('return ')) {
    return new Function(...args, stringAction);
  }
  return new Function(...args, `return ${stringAction};`)
};

const arr = [4, 5, 6, 7, 9, 0, 3]
console.log(arr.reduce(f("$1 + $2"), 0));
console.log(arr.sort(f("$1 - $2")));

console.log(f('40')())
