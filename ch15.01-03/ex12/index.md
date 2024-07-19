勤怠用のbookmarkletのため、こちらにアップしない。

```javascript
// Concur のレポート名を自動で設定する (javascript:${下記コード} をブックマークレットに登録して利用)
//
// 参考:
// - https://github.com/facebook/react/issues/10135

(() => {
  const EMPLOYEE_NUMBER = "00000000";

  function setNativeValue(element, value) {
    const valueSetter = Object.getOwnPropertyDescriptor(element, "value").set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(
      prototype,
      "value"
    ).set;

    if (valueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
    } else {
      valueSetter.call(element, value);
    }
  }

  const [year, month, day] = new Date()
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/");
  const title = `${year}${month}${day}-${EMPLOYEE_NUMBER}-${year}年${month}月交通費`;
  const name = document.querySelector("#name");
  setNativeValue(name, title);
  name.dispatchEvent(new Event("input", { bubbles: true }));
})();
```