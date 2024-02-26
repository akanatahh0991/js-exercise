const superObj = {
  commonNum: 1,
  superNum: 2,
  superText: 'SuperText',
  prop: 'EnumerableProp' 
}

const subObj = Object.create(superObj);
subObj.commonNum = 11;
subObj.subNum = 12;
subObj.subText = 'SubText';
Object.defineProperty(subObj, 'prop', {
  value: 'Non-Enumerable',
  enumerable: false,
  writable: true,
  configurable: true
});

for (const p in subObj) {
  console.log(`p=${p}, v=${subObj[p]}`);
}

/*
 * 出力結果
 * p=commonNum, v=11
 * p=subNum, v=12
 * p=subText, v=SubText
 * p=superNum, v=2
 * p=superText, v=SuperText
 */