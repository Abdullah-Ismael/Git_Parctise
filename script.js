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
  input.focus();
  render();
});


// ===== Feature: done =====
itemHooks.push((li, todo) => {
  li.classList.toggle("done", todo.done);
  li.querySelector("span").addEventListener("click", () => {
    todo.done = !todo.done;
    render();
  });
});
// ===== end done =====



// ===== Feature: delete =====
itemHooks.push((li, todo, index) => {
  const button = document.createElement("button");
  button.textContent = "Delete";
  button.className = "delete-btn";
  button.setAttribute("aria-label", "Delete " + todo.text);
  button.addEventListener("click", () => {
    todos.splice(index, 1);
    render();
  });
  li.appendChild(button);
});
// ===== end delete =====


document.querySelector("#clear-all").addEventListener("click", () => {
  todos = [];
  render();
});

render();
