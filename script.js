const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const todosList = document.getElementById("todos-list");
const itemsLeft = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-completed");
const emptyState = document.querySelector(".empty-state");
const dateElement = document.getElementById("date");
const filters = document.querySelectorAll(".filter");

let todos = [];
let currentfilter ="all";


addTaskBtn.addEventListener("click", () => {
    addTodo(taskInput.value);
});

taskInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") addTodo(taskInput.value);
});

clearCompletedBtn.addEventListener("click",clearCompleted)

function addTodo(text){
    if(text.trim() === "") return


    const todo ={
        id: Date.now(),
        text,
        completed:false
    }

    todos.push(todo)

    saveTodos()
    //renderTodos()
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos))
    updateItemCount()
    checkEmptyState()
}

function updateItemCount() {
    const uncompletedTodos = todos.filter(todo => !todo.completed)
    itemsLeft.textContent = `${uncompletedTodos.length} item${
        uncompletedTodos.length !== 1 ? "s" : ""
    }left`;
}

function checkEmptyState() {
    const filteredTodos = filterTodos(currentfilter)
    if(filteredTodos.length === 0) emptyState.classList.remove("hidden")
    else emptyState.classList.add("hidden")
}

function filterTodos(filter) {
    switch(filter){
        case"active":
            return todos.filter((todo) => !todo.completed)
        case"completed":
            return todos.filter((todo) => todo.completed)
        default:
            return todos;

    }
} 

function renderTodos() {
    todosList.innerHTML = "";

    const filteredTodos = filterTodos(currentfilter)

    filterTodos.forEach(todo => {
        const todoItem = document.createElement("Li")
        todoItem.classList.add("todo-item")
        if(todo.completed) todoItem.classList.add("completed")
        
        const checkboxContainer = document.createElement("label")
        checkboxContainer.classList.add("checkbox-container")

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.classList.add("todo-checkbox")
        checkbox.checked = todo.completed
        checkbox.addEventListener("change", () => toggleTodo(todo))

        const checkmark = document.createElement("span")
        checkmark.classList.add("checkmark")

        checkboxContainer.appendChild(checkbox)
        checkboxContainer.appendChild(checkmark)

        const todoText = document.createElement("span")
        todoText.classList.add("todo-item-text")
        todoText.textContent = todo.text

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn")
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
        deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    })
}

function clearCompleted() {}
function toggleTodo(id) {}
function deleteTodo(id) {}

