// Get the logged-in user from localStorage
const users = JSON.parse(localStorage.getItem("users"));
const currentUser = users ? users[0] : null; // Assuming only one user is logged in at a time

// My Task Date..
const date = document.querySelector(".Date");
const email = document.querySelector(".email");
const names = document.querySelector(".name");
const nameLetter = document.querySelector(".nameLetter");
const greeting = document.querySelector(".Greeting");
const logOut = document.querySelector(".logOutButtonBtn");
const form = document.querySelector(".form");
const list = document.querySelector(".list");
const inputTask = document.getElementById("inputTask");

// Showing Greeting 
function greet(greetValue) {
    greeting.textContent = greetValue;
}

const hour = (new Date().getUTCHours() + 5) % 24;
if (hour >= 5 && hour < 12) {
    greet("Good Morning 🌅");
} else if (hour >= 12 && hour < 17) {
    greet("Good Afternoon 🕛");
} else if (hour >= 17 && hour < 21) {
    greet("Good Evening 🌃");
} else {
    greet("Good Night 🌙");
}

// Date And time
const dates = new Date().toLocaleString();
date.textContent = dates;

if (!currentUser) {
    window.location.href = "../index.html";
}

// Display user info
email.textContent = currentUser.email;
names.textContent = currentUser.name;
const firstLetter = currentUser.name.charAt(0);
nameLetter.textContent = firstLetter;

// Now logOut Button
logOut.addEventListener("click", function () {
    localStorage.removeItem("users");
    location.href = "../index.html";
});

// My Task aside
const myTask = document.querySelector(".myTask");
myTask.addEventListener("click", function () {
    alert("My Task is coming soon.");
});

// MY calendar Aside
const calender = document.querySelector(".calender");
calender.addEventListener("click", function () {
    alert("Calendar is coming soon");
});

// my setting aside
const setting = document.querySelector(".setting");
setting.addEventListener("click", function () {
    alert("Setting Coming soon");
});

const hamburger = document.querySelector(".hamburger");
const aside = document.querySelector(".Aside");
hamburger.addEventListener("click", function () {
    aside.classList.toggle("active");
});

// Initialize todos for current user
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let userTodos = todos.filter(todo => todo.userEmail === currentUser.email);

// Function to save todos to localStorage
function saveTodos() {
    // Keep todos from other users
    const otherTodos = todos.filter(todo => todo.userEmail !== currentUser.email);
    // Combine with current user's todos
    todos = [...otherTodos, ...userTodos];
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to render todos
function renderTodos() {
    list.innerHTML = "";
    userTodos.forEach((todo, index) => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = todo.task;
        if (todo.isCompleted) {
            span.classList.add("textRead");
        }
        li.classList.add("li-list");

        const div = document.createElement("div");
        div.classList.add("div-Class");

        // Delete Button
        const Delete = document.createElement("button");
        Delete.textContent = "Delete";
        Delete.classList.add("btnDelete");

        // Complete Button (changed from Read)
        const complete = document.createElement("button");
        complete.textContent = todo.isCompleted ? "Undo" : "Complete";
        complete.classList.add("btnComplete");
        complete.classList.add("btnRead")


        // Edit Button
        const edit = document.createElement("button");
        edit.textContent = "Edit";
        edit.classList.add("btnEdit");

        // Append buttons to div
        div.appendChild(Delete);
        div.appendChild(complete);
        div.appendChild(edit);

        // Append span and div to li
        li.appendChild(span);
        li.appendChild(div);

        // Append li to the list
        list.appendChild(li);

        // Delete: Remove the todo
        Delete.addEventListener("click", function () {
            userTodos.splice(index, 1);
            saveTodos();
            renderTodos();
            updateTaskCount();
        });

        // Complete: Toggle completion status
        complete.addEventListener("click", function () {
            todo.isCompleted = !todo.isCompleted;
            complete.textContent = todo.isCompleted ? "Undo" : "Complete";
            span.classList.toggle("textRead");
            saveTodos();
            updateTaskCount();
        });

        // Edit: Update the task text
        edit.addEventListener("click", function () {
            const newText = prompt("Edit Task:", todo.task);
            if (newText !== null && newText.trim() !== "") {
                todo.task = newText.trim();
                span.textContent = newText.trim();
                saveTodos();
            }
        });
    });
    updateTaskCount();
}

// Function to update task count
function updateTaskCount() {
    const total = userTodos.length;
    const completed = userTodos.filter(todo => todo.isCompleted).length;
    const pending = total - completed;
    
    document.querySelector(".countingTask h5:nth-child(1)").textContent = ` Total: ${total}`;
    document.querySelector(".countingTask h5:nth-child(2)").textContent = ` Completed: ${completed}`;
    document.querySelector(".countingTask h5:nth-child(3)").textContent = ` Pending: ${pending}`;
}

// Submit Task
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const taskText = inputTask.value.trim();

    if (!taskText) {
        alert("Please Enter Your Task");
        return;
    }

    const newTodo = {
        task: taskText,
        userEmail: currentUser.email,
        isCompleted: false,
        createdAt: new Date().toISOString()
    };

    userTodos.push(newTodo);
    saveTodos();
    renderTodos();
    inputTask.value = "";
    alert("Task created successfully");
});

// Initial render
renderTodos();