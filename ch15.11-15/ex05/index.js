import * as taskdb from "./taskDB.js";
const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
reload();
document.addEventListener("visibilitychange", async () => {
  console.log(`visibilitychange ${document.visibilityState}`)
  if (document.visibilityState === "visible") {
    await reload()
  }
});
window.addEventListener("focus", async () => {
  await reload();
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault();
  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  // new-todo の中身は空にする
  input.value = "";
  try {
    const newTask = await taskdb.addTask(todo);
    appendToDoItem(newTask);
  } catch (err) {
    console.log(err);
  }
});

function appendToDoItem(task) {
  console.log(`append item ${JSON.stringify(task)}`);
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");
  const label = document.createElement("label");
  label.textContent = task.name;
  const isCompleted = task.status === "completed";
  label.style.textDecorationLine = isCompleted ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = isCompleted;
  // TODO: toggle が変化 (change) した際に label.style.textDecorationLine を変更しなさい
  toggle.addEventListener("change", async () => {
    try {
      const updatedTask = await taskdb.updateTask(task.id, {status: toggle.checked ? "completed" : "active"});
      label.style.textDecorationLine = (updatedTask.status === "completed")  ? "line-through" : "none";
    } catch(err) {
      console.log(err);
    }
  });

  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  // TODO: destroy がクリック (click) された場合に elem を削除しなさい
  destroy.addEventListener("click", async () => {
    try {
      await taskdb.removeTask(task.id);
      list.removeChild(elem);
    } catch(err) {
      console.log(err)
    }
  });
  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}

async function reload() {
  list.innerHTML = '';
  try {
    const tasks = await taskdb.getAllTasks();
    tasks.forEach(task => {
      appendToDoItem(task);
    });
  } catch(err) {
    console.log(err)
  }
}
