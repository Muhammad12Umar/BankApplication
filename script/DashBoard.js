// Get the logged-in user from localStorage
const loginUser = JSON.parse(localStorage.getItem("user")); // Assuming only one user is logged in at a time
const users = JSON.parse(localStorage.getItem("users"));

// DOM Elements
const date = document.querySelector(".Date");
const email = document.querySelector(".email");
const names = document.querySelector(".name");
const nameLetter = document.querySelector(".nameLetter");
const greeting = document.querySelector(".Greeting");
const logOut = document.querySelector(".logOutButtonBtn");
const AccountType = document.querySelector(".AccountType");
const balance = document.querySelector(".amountBalance");
const BankName = document.querySelector(".BankName");
const BrachNo = document.querySelector(".BrachNo");
const brachAddress = document.querySelector(".brachAddress");
const printStatment = document.querySelector(".printStatment");
const DepositForm = document.querySelector("#DepositForm");
const WithDrawForm = document.querySelector("#WithDrawForm");
const showBalanceinModel = document.querySelector(".ShowBalance");

// Show Greeting
function greet(greetValue) {
  greeting.textContent = greetValue;
}

// Set greeting based on time
const hour = new Date().getHours();
if (hour >= 5 && hour < 12) {
  greet("GOOD MORNING 🌅");
} else if (hour >= 12 && hour < 17) {
  greet("GOOD AFTERNOON 🕛");
} else if (hour >= 17 && hour < 21) {
  greet("GOOD EVENING 🌃");
} else {
  greet("GOOD NIGHT 🌙");
}

// Set current date and time
const dates = new Date().toLocaleString();
date.textContent = `LOGIN DATE: ${dates}`;

// Redirect to login if no user found
if (!loginUser) {
  localStorage.removeItem("LoginUsers");
  window.location.href = "../index.html";
}

// Display user information
email.textContent = loginUser.email;
names.textContent = `Welcome Back! ${loginUser.names}`;
const firstLetter = loginUser.names.charAt(0).toUpperCase();
nameLetter.textContent = firstLetter;

// Logout Functionality
logOut.addEventListener("click", function () {
  localStorage.removeItem("user");
  location.href = "../index.html";
});

// My Task aside
const myTask = document.querySelector(".myTask");
myTask.addEventListener("click", function () {
  alert("My Task is coming soon.");
});

// Calendar aside
const calender = document.querySelector(".calender");
calender.addEventListener("click", function () {
  alert("Calendar is coming soon");
});

// Settings aside
const setting = document.querySelector(".setting");
setting.addEventListener("click", function () {
  alert("Setting is coming soon");
});

// Hamburger menu toggle
const hamburger = document.querySelector(".hamburger");
const aside = document.querySelector(".Aside");
hamburger.addEventListener("click", function () {
  aside.classList.toggle("active");
});

class Bank {
  constructor(BankName) {
    this.BankName = BankName;
  }
}

class Branch extends Bank {
  constructor(BankName, BranchNo, BranchAddress) {
    super(BankName, balance);
    this.BranchNo = BranchNo;
    this.BranchAddress = BranchAddress;
  }
}

class Account extends Branch {
  constructor(BankName, BranchNo, BranchAddress) {
    super(BankName, BranchNo, BranchAddress);
  }
}

// Fixed Deposit
Account.prototype.Deposit = function (amount) {
  if (amount <= 0) {
    alert("❌ Invalid deposit amount.");
    return;
  } else {
  
     const matchUser = users.find((item) => item.email === loginUser.email);
    matchUser.balance += amount;
    loginUser.balance += amount;
    localStorage.setItem("user", JSON.stringify(loginUser));
    localStorage.setItem("users", JSON.stringify(users));
  
    alert(`✅ Deposit Successful. New Balance: Rs. ${loginUser.balance}`);
  }
};

// Show Balance Funtion.
Account.prototype.showBalance = function () {
  showBalanceinModel.textContent = loginUser.balance;
  balance.textContent = loginUser.balance;
  brachAddress.textContent = this.BranchAddress;
  BrachNo.textContent = `${this.BranchNo}`;
  AccountType.textContent = `${loginUser.accountType}`;
  BankName.textContent = `${this.BankName.toUpperCase()}`;
};

// With Draw Funtion
Account.prototype.withDraw = function (amount) {
  if (amount > loginUser.balance) {
    alert("❌ Insufficient Balance !");
  } else {
 
    const matchUser = users.find((item) => item.email === loginUser.email);
    matchUser.balance -= amount;
    loginUser.balance -= amount;
    localStorage.setItem("user", JSON.stringify(loginUser));
    localStorage.setItem("users", JSON.stringify(users));
    alert(`✅ WithDraw Successful. New Balance: Rs. ${loginUser.balance}`);
  }
};

const result = new Account("BANK OF UBL", 1, "Peshawer");

// print Funtion of save Balance here .
printStatment.addEventListener("click", function () {
  const printArea = document.querySelector(".printArea").innerHTML;
  const originalContents = document.body.innerHTML;

  document.body.innerHTML = printArea;
  window.print();
  document.body.innerHTML = originalContents;
  location.reload(); // to restore events & DOM
});

// Form of Deposit Model
DepositForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const depositValue = +event.target.DepositInput.value;

  result.Deposit(depositValue);

  result.showBalance();

  event.target.reset();
});

// Form of withDraw Model

WithDrawForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const withDrawValue = +event.target.WithdrawInput.value;

  result.withDraw(withDrawValue);

  result.showBalance();

  event.target.reset();
});

result.showBalance();
