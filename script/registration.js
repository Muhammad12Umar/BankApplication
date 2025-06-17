

const resultMessage = document.querySelector(".text-center");
const registrationForm = document.querySelector("#registration-form");
registrationForm.addEventListener("submit", function (event) {
    event.preventDefault()



    // get users From local.stroage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // targeted
    const name = event.target.fullname.value
    const email = event.target.email.value;
    const passsword = event.target.password.value;

    // userExist
    const userExist = users.find(item => item.email === email)


    if (userExist) {
        resultMessage.textContent = "Your are Already Exist Please Login🤔";
        resultMessage.style.color = 'red'
        location.href = "../index.html"



    }


    // conditions....
    function conditions(text, textColor) {
        resultMessage.textContent = text;
        resultMessage.style.color = textColor;
    }

    if (name.trim() === "" || !isNaN(name)) {
        conditions("Please Enter Your Name", "red")

    }

    else if (email.trim() === "" || !email.includes("@")) {
        conditions("Please Enter Your Email", "red")

    }

    else if (passsword.trim() === "" || passsword.length <= 4) {
        conditions("Please Enter Your Password", "red")

    }



    else {
        const user = {
            name, email, passsword
        }
        users.push(user)

        localStorage.setItem('users', JSON.stringify(users))

        event.target.reset();



    }



})