// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteComplete);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
  // prevent form from submitting
  event.preventDefault();

  // prevent empty task
  if (!todoInput.value.trim()) {
    return;
  }

  // todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // add todo to local storage
  saveLocalTodos(todoInput.value);

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
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
    removeLocalTodos(todo);
  }

  // mark todo as complete
  if (item.classList.contains("complete-btn")) {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(event) {
  // get todo divs
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    // filter based on option value
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "complete":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // check for existing todos
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // add any new todos
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  // check for existing todos
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // recreate existing todos from storage
  todos.forEach(function (todo) {
    // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
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
  });
}

function removeLocalTodos(todo) {
  // check for existing todos
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // get index of todo to be removed
  const todoIndex = todos.indexOf(todo.children[0].innerText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
