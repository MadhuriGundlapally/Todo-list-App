const addBtn = document.getElementById("addBtn");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const pagination = document.getElementById("pagination");

const todos = [];
const itemsPerPage = 3;
let currentPage = 1;

// Add Task
addBtn.addEventListener("click", () => {
  const task = todoInput.value.trim();

  if (task === "") {
    showErrorMessage("Please enter a task.");
    return;
  }

  todos.unshift(task);
  todoInput.value = "";

  currentPage = 1;

  renderTodos();
  renderPagination();
});

// Render Todos
function renderTodos() {
  todoList.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const currentTodos = todos.slice(start, end);

  currentTodos.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    const taskText = document.createElement("span");
    taskText.className = "todo-text";
    taskText.textContent = task;

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", () => {
      editTask(start + index, li);
    });

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      deleteTask(start + index);
    });

    li.appendChild(taskText);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
}

// Pagination
function renderPagination() {
  pagination.innerHTML = "";

  const totalPages = Math.ceil(todos.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");

    btn.className = "pagination-btn";
    btn.textContent = i;

    if (i === currentPage) {
      btn.disabled = true;
    }

    btn.addEventListener("click", () => {
      currentPage = i;
      renderTodos();
      renderPagination();
    });

    pagination.appendChild(btn);
  }
}

// Edit Task
function editTask(index, li) {
  li.innerHTML = "";

  const input = document.createElement("input");
  input.type = "text";
  input.value = todos[index];
  input.className = "todo-input";

  const saveBtn = document.createElement("button");
  saveBtn.className = "save-btn";
  saveBtn.textContent = "Save";

  saveBtn.addEventListener("click", () => {
    const updatedTask = input.value.trim();

    if (updatedTask === "") {
      showErrorMessage("Task cannot be empty.");
      return;
    }

    todos[index] = updatedTask;

    renderTodos();
  });

  li.appendChild(input);
  li.appendChild(saveBtn);
}

// Delete Task
function deleteTask(index) {
  todos.splice(index, 1);

  if ((currentPage - 1) * itemsPerPage >= todos.length) {
    currentPage = Math.max(currentPage - 1, 1);
  }

  renderTodos();
  renderPagination();
}

// Error Message
function showErrorMessage(message) {
  const errorMessage = document.getElementById("errorMessage");

  errorMessage.textContent = message;
  errorMessage.style.display = "block";

  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 3000);
}