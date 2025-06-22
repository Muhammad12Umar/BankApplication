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
    greet("GOOD MORNING 🌅");
} else if (hour >= 12 && hour < 17) {
    greet("GOOD AFTER NOON 🕛");
} else if (hour >= 17 && hour < 21) {
    greet("GOOD EVENING🌃");
} else {
    greet("GOOD NIGHT  🌙");
}

// Date And time
const dates = new Date().toLocaleString();
date.textContent = `LOGIN DATE : ${dates}`;

if (!currentUser) {
    window.location.href = "../index.html";
}

// Display user info
email.textContent = currentUser.email;
names.textContent = `Wellcome Back ! ${currentUser.name}`;
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



