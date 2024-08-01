const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
<template id="todo-template">
      <li>
        <div class="view">
          <input class="toggle" type="checkbox" />
          <label class="content"></label>
          <button class="destroy">❌</button>
        </div>
      </li>
    </template>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");
    const list = this.shadowRoot.querySelector("#todo-list");
    const input = this.shadowRoot.querySelector("#new-todo");
    const todoTemplate = this.shadowRoot.querySelector("#todo-template");
    // TODO: 残りを実装
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (input.value.trim() === "") {
        return;
      }
      const todo = input.value.trim();
      input.value = "";
      const clone = todoTemplate.content.cloneNode(true);
      const li = clone.querySelector("li");
      const toggle = clone.querySelector("input");
      const label = clone.querySelector("label");
      const destroy = clone.querySelector("button");

      toggle.addEventListener("change", () => {
        li.classList.toggle("completed", toggle.checked);
      });
      label.textContent = todo;
      destroy.addEventListener("click", () => {
        li.remove();
      });

      list.prepend(li);
    });
  }
}

customElements.define("todo-app", TodoApp);
