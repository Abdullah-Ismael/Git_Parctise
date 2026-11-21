const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");

let todos = [];

// Features plug in here. Each hook runs once for every item when it is drawn.
const itemHooks = [];

function render() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    const text = document.createElement("span");
    text.textContent = todo.text;
    li.appendChild(text);
    itemHooks.forEach((hook) => hook(li, todo, index));
    list.appendChild(li);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text: text, done: false });
  input.value = "";
  render();
});


// ===== Feature: done =====
// ===== end done =====



// ===== Feature: delete =====
// ===== end delete =====


render();
