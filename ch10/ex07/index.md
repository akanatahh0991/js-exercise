> JavaScript/TypeScript の有名な日付操作の OSS リポジトリである[date-fns](https://github.com/date-fns/date-fns)、[Luxon](https://github.com/moment/luxon)、[Day.js](https://github.com/iamkun/dayjs)のそれぞれが、src ディレクトリ以下がどのようなまとまりでモジュール分割されているか分析して、それぞれ 2、3 段落程度で記述しなさい。

## [date-fns](https://github.com/date-fns/date-fns)のモジュール分割

提供するメソッド毎にフォルダーが用意されておりindex.tsにメソッドが定義されている。src直下のindex.tsでそれらのメソッドが再エクスポートされ提供されている。

## [Luxon](https://github.com/moment/luxon)
提供するMd単位でファイル分割されており、src直下のluxon.jsでそれらのMdがエクスポートされている。

## [Day.js](https://github.com/iamkun/dayjs)のモジュール分割
提供機能はsrc直下のindex.jsにすべて記述されており、それらの提供機能の内部実装で必要なutils, locale, constantが別ファイルで提供されている。