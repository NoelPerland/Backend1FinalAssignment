let list = document.querySelector(".todos-list");
let todoForm = document.querySelector(".todo-form");
let inputTodo = document.querySelector("#todo");
let inputCompleted = document.querySelector("#completed");

fetchTodos();
// Todo Form Eventlistener
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let todo = inputTodo.value;
  let completed = inputCompleted.value;

  postTodo(todo, completed);
});

// GET request -> Todos
async function fetchTodos() {
  const response = await fetch("http://localhost:5050/todos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  renderTodos(data);
}

// POST request -> Todos
async function postTodo(todo, completed) {
  const response = await fetch("http://localhost:5050/todos", {
    method: "POST",
    body: JSON.stringify({ todo, completed }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  console.log("Add Todo data -> ", data);
  fetchTodos();
}

// PATCH request -> Todos
async function patchTodo(todo_id, completed) {
  const response = await fetch("http://localhost:5050/todos", {
    method: "PATCH",
    body: JSON.stringify({ todo_id, completed }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  console.log("Patch Todo data -> ", data);
  fetchTodos();
}

// DELET request -> Todos
async function deleteTodo(todo_id) {
  const response = await fetch("http://localhost:5050/todos", {
    method: "DELETE",
    body: JSON.stringify({ todo_id }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  console.log("DELETE Todo data -> ", data);
  await fetchTodos();
}

// Function for rendering Todos on Page
function renderTodos(todos) {
  // Clears List
  while (list.firstChild) {
    list.removeChild(list.lastChild);
  }

  // Check not logged in
  if (todos.message == "No Active LoginToken") {
    let h2 = document.createElement("h2");
    let btnHome = document.createElement("button");
    h2.textContent = "Not Logged In!";
    btnHome.textContent = "Take Me Home!";
    btnHome.addEventListener(
      "click",
      () => (window.location = "../html/index.html")
    );
    list.append(h2, btnHome);
    return;
  }

  // Render Each Todo
  todos.forEach((item) => {
    let li = document.createElement("li");
    let btnComplete = document.createElement("button");
    let btnDelete = document.createElement("button");
    btnComplete.textContent = "Change";
    btnDelete.textContent = "Remove";
    let text;

    // Changes completed from 0/1 to string
    if (item.completed === 0) {
      text = `Todo:${item.todo} - Status: Not Completed `;
      li.innerText = text;
    } else {
      text = `Todo:${item.todo} - Status: Completed `;
      li.innerText = text;
    }

    // Eventlistener for Updating todo completion
    btnComplete.addEventListener("click", () => {
      if (item.completed === 0) {
        patchTodo(item.todo_id, 1);
      } else {
        patchTodo(item.todo_id, 0);
      }
    });

    // Eventlistener for Deleting todo item
    btnDelete.addEventListener("click", () => {
      deleteTodo(item.todo_id);
    });

    li.append(btnComplete, btnDelete);
    list.appendChild(li);
  });
}
