const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

initialized();

form.addEventListener("submit", (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault();
  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  // new-todo の中身は空にする
  input.value = "";
  const newTask = {
    id: newTaskId(),
    name: todo,
    status: "active",
  };
  appendToDoItem(newTask);
});

function appendToDoItem(task) {
  console.log(`append item ${JSON.stringify(task)}`)
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");
  elem.dataset.id = task.id;
  const label = document.createElement("label");
  label.textContent = task.name;
  const isCompleted = task.status === "completed"
  label.style.textDecorationLine = isCompleted ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = isCompleted;
  // TODO: toggle が変化 (change) した際に label.style.textDecorationLine を変更しなさい
  toggle.addEventListener("change", () => {
    const updatedTask = { ...task };
    updatedTask.status = toggle.checked ? "completed" : "active";
    window.localStorage.setItem(task.id, JSON.stringify(updatedTask));
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
  });

  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  // TODO: destroy がクリック (click) された場合に elem を削除しなさい
  destroy.addEventListener("click", () => {
    window.localStorage.removeItem(task.id);
    list.removeChild(elem);
  });
  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
  console.log(`append ${task.id}, ${task}`)
  window.localStorage.setItem(task.id, JSON.stringify(task));
}

window.addEventListener("storage", (event) => {
  console.log(`storage event received key=${event.key}, ${event.oldValue} -> ${event.newValue}`)
  if (event.key === null || event.key === "taskId") {
    return;
  }
  const liElements = Array.from(document.querySelectorAll("li"));
  if (event.newValue === null) {
    const deletedTask = JSON.parse(event.oldValue);
    const deletedElem = liElements.find((elem) => elem.dataset.id === deletedTask.id);
    list.removeChild(deletedElem);
  } else {
    if (event.oldValue === null) {
      const newTask = JSON.parse(event.newValue);
      appendToDoItem(newTask);
    } else {
      console.log("updated" + event.oldValue)
      const updatedTask = JSON.parse(event.newValue);
      const updatedElem = liElements.find((elem) => elem.dataset.id === updatedTask.id);
      const isCompleted = updatedTask.status === "completed"
      const toggle = updatedElem.querySelector("input");
      toggle.checked = isCompleted;
      const label = updatedElem.querySelector("label");
      label.style.textDecorationLine = isCompleted ? "line-through" : "none";
    }
  }
});

function newTaskId() {
  const taskId = window.localStorage.getItem("taskId") ?? "0";
  window.localStorage.setItem("taskId", String(parseInt(taskId) + 1));
  return taskId;
}

function initialized() {
  const tasks = [];
  const keys = Object.keys(window.localStorage)
  keys.forEach((key) => {
    if (key !== "taskId") {
      tasks.push(JSON.parse(localStorage.getItem(key)));
    }
  })
  tasks.forEach(task => appendToDoItem(task))
}
