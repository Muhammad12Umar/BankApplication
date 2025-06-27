
// Get the logged-in user from localStorage
const currentUser = JSON.parse(localStorage.getItem("LoginUsers")); // Assuming only one user is logged in at a time


// DOM Elements
const date = document.querySelector(".Date");
const email = document.querySelector(".email");
const names = document.querySelector(".name");
const nameLetter = document.querySelector(".nameLetter");
const greeting = document.querySelector(".Greeting");
const logOut = document.querySelector(".logOutButtonBtn");
const AccountType = document.querySelector(".AccountType");
const balance = document.querySelector(".ShowBalance");
const BankName = document.querySelector(".BankName");
const BrachNo = document.querySelector(".BrachNo");
const brachAddress = document.querySelector(".brachAddress");
const printStatment = document.querySelector(".printStatment");
const DepositForm = document.querySelector('#DepositForm');
const WithDrawForm = document.querySelector("#WithDrawForm");
const amountBalance=document.querySelector(".amountBalance");





// Show Greeting
function greet(greetValue) {
    greeting.textContent = greetValue;
}

// Set greeting based on time
const hour = (new Date().getUTCHours() + 5) % 24;
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
if (!currentUser || !currentUser.email || !currentUser.names) {
    localStorage.removeItem("LoginUsers");
    window.location.href = "../index.html";
}

// Display user information
email.textContent = currentUser.email;
names.textContent = `Welcome Back! ${currentUser.names}`;
const firstLetter = currentUser.names.charAt(0).toUpperCase();
nameLetter.textContent = firstLetter;

// Logout Functionality
logOut.addEventListener("click", function () {
    localStorage.removeItem("LoginUsers");
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
    constructor(BankName, balance) {
        this.BankName = BankName;
        this.balance = balance;


    }
}

class Branch extends Bank {
    constructor(BankName, balance, BranchNo, BranchAddress) {
        super(BankName, balance);
        this.BranchNo = BranchNo;
        this.BranchAddress = BranchAddress;
    }
}

class Account extends Branch {
    constructor(AccountType, BankName, balance, BranchNo, BranchAddress) {
        super(BankName, balance, BranchNo, BranchAddress);
        this.AccountType = AccountType;
    }
}

// Details
Account.prototype.detail = function () {

    console.log(`The Branch Address is ${this.brachAddress}`);
    console.log(`The Branch NO is ${this.BranchNo}`);
    console.log(`The Balance is ${this.balance}`);
    console.log(`The Account  Type is : ${this.AccountType}`);
    console.log(`The Bank Name  is : ${this.BankName}`);




}

// Show Balance

// Fixed Deposit
Account.prototype.Deposit = function (amount) {
    if (amount <= 0) {
    alert('❌ Invalid deposit amount.');
    } else {
        this.balance += amount;
        alert(`✅ Deposit Successful. New Balance: Rs. ${this.balance}`);
    }
}

Account.prototype.showBalance = function () {
    brachAddress.textContent = this.BranchAddress;
    BrachNo.textContent = `${this.BranchNo}`
    balance.textContent = ` Rs. ${this.balance}`
    AccountType.textContent = `${this.AccountType}`
    BankName.textContent = `${this.BankName.toUpperCase()}`
    amountBalance.textContent=`${this.balance}`

}

Account.prototype.withDraw = function (amount) {
    if (amount > this.balance) {
        alert('❌ Insufficient Balance !');
    } else {
        this.balance -= amount;
        alert(`✅ WithDraw Successful. New Balance: Rs. ${this.balance}`);
    }
}

const result = new Account("Saving  Account", 'BANK OF UBL ', 0, 1, "Peshawer Board Bazar");

// printing  The Data Detail

printStatment.addEventListener("click", function () {
    print(result.detail())
})

// form of deposit
DepositForm.addEventListener("submit", function (event) {
    event.preventDefault()

    const depositValue = +event.target.DepositInput.value;

    result.Deposit(depositValue);

    event.target.reset();


    result.showBalance();




})

// withDraw Deposit Amounts

WithDrawForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const withDrawValue = event.target.WithdrawInput.value;

    result.withDraw(withDrawValue)
    
    result.showBalance();

    event.target.reset();




})

result.showBalance();










// Use Deposit method

