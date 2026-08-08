// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteComplete);

// Functions
function addTodo(event) {
  // prevent form from submitting
  event.preventDefault();

  // todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // create delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);

  // attach todo-div to ul
  todoList.appendChild(todoDiv);

  // clear todo input value
  todoInput.value = "";
}

function deleteComplete(e) {
  const item = e.target;

  // delete todo
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.remove();
  }

  if (item.classList.contains("complete-btn")) {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
