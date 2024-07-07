> 2. index.html ファイル内の script タグから `type="module"` 属性を削除した場合、期待通り動作させるにはどうすべきか答えなさい。

スクリプトをheaderタグではなく、bodyタグの最後で呼ぶようにする。
```
<body>
    <form id="new-todo-form">
      <input type="text" id="new-todo" placeholder="What needs to be done?" />
      <button type="submit">Add</button>
    </form>
    <ul id="todo-list"></ul>
    <script src="/ch15.01-03/ex01/index.js"></script>
</body>
```