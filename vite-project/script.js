// DOM-Elemente werden mit const gespeichert, da ihre Referenz nicht geändert wird
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");

// Variable todos setzen
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Todos aus dem LocalStorage laden
function loadTodos() {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  renderTodos();
}

// Funktion SaveTodos. Todos im Local Storage speichern
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Event Listener für das Formular
todoForm.addEventListener("submit", (event) => {
  // Verhindert das Neuladen der Seite
  event.preventDefault();

  // Entfernt Leerzeichen am Anfang und Ende des Textes
  const todoText = todoInput.value.trim();

  // Wenn das Eingabefeld leer ist, wird die Funktion beendet
  if (todoText === "") {
    return;
  }

  // Neues Todo-Objekt erstellen
  const todo = {
    id: Date.now(), // Eindeutige ID mit aktuellem Zeitstempel
    text: todoText,
    completed: false, // Standardmäßig ist die Aufgabe nicht erledigt
  };

  // Todo zum Array hinzufügen
  todos.push(todo);
  saveTodos();

  // Eingabefeld leeren
  todoInput.value = "";

  // Todos neu rendern
  renderTodos();
});

// Funktion zum Rendern der Todos
function renderTodos() {
  // Liste leeren
  todoList.innerHTML = "";

  // Über alle Todos iterieren
  todos.forEach((todo) => {
    // Neues Li-Element erstellen
    const li = document.createElement("li");

    // Checkbox erstellen
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", "Aufgabe als erledigt markieren");

    // Event Listener für Checkbox
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    // Span für den Text erstellen
    const span = document.createElement("span");
    span.textContent = todo.text;
    if (todo.completed) {
      span.style.textDecoration = "line-through";
    }

    // Lösch-Button erstellen
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Löschen";
    deleteBtn.setAttribute("aria-label", "Aufgabe löschen");

    // Event Listener für Lösch-Button
    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    // Elemente zum Li hinzufügen
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // Li zur Liste hinzufügen
    todoList.appendChild(li);
  });
}

loadTodos();
