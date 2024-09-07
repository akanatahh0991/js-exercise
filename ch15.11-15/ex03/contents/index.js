const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    const response = await fetch("http://localhost:3001/api/tasks", {mode: "cors", credentials: 'include'});
    if (response.ok) {
      const result = await response.json();
      result.items.forEach((task) => {
        appendToDoItem(task);
      });
    } else {
      const error = await response.json();
      alert(
        `Error is Occurred: statuscode=${response.status}, message=${error.message}`
      );
    }
  } catch (e) {
    alert(`Error is Occurred: ${e.message}`);
  }
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault();
  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoElement で ToDo リストの要素として追加しなさい
  try {
    const response = await fetch("http://localhost:3001/api/tasks", {
      mode: "cors",
      credentials: 'include',
      method: "POST",
      body: JSON.stringify({ name: todo }),
    });
    if (response.ok) {
      const task = await response.json();
      appendToDoItem(task);
    } else {
      const error = await response.json();
      alert(
        `Error is Occurred: statuscode=${response.status}, message=${error.message}`
      );
    }
  } catch (e) {
    alert(`Error is Occurred: ${e.message}`);
  }
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.type = "checkbox";
  toggle.addEventListener("change", async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        mode: "cors",
        credentials: 'include',
        method: "PATCH",
        body: JSON.stringify({
          status: toggle.checked ? "completed" : "active",
        }),
      });
      if (response.ok) {
        const updatedTask = await response.json();
        label.style.textDecorationLine =
          updatedTask.status === "completed" ? "line-through" : "none";
      } else {
        const error = await response.json();
        alert(
          `Error is Occurred: statuscode=${response.status}, message=${error.message}`
        );
      }
    } catch (e) {
      alert(`Error is Occurred: ${e.message}`);
    }
  });
  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "❌";
  destroy.addEventListener("click", async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        mode: "cors",
        credentials: 'include',
        method: "DELETE",
      });
      if (response.ok) {
        list.removeChild(elem);
      } else {
        const error = await response.json();
        alert(
          `Error is Occurred: statuscode=${response.status}, message=${error.message}`
        );
      }
    } catch (e) {
      alert(`Error is Occurred: ${e.message}`);
    }
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}
