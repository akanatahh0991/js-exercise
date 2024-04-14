> CommonJS と ES Module 以外の JavaScript のモジュール方式名を調べて記述しなさい

- AMD(Asynchronous Module Definition)

  クライアントサイドでモジュール形式を使用できるようにしたもの。非同期的に読み込む。
  
  export側
  ```javascript
  define('Module2', ['Module1'], function(module1) {
    function func() {
        // 15
        return module1(3,5);
    }
    return func;
    });
  ```
  import側
  ```html
  <html>
   <body>
     ...
     <!-- エントリーポイントを指定して RequireJS をロードする -->
     <script data-main="main.js" src="require.js"></script>
   </body>
    </html>
  ```