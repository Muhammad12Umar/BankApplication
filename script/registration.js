
// password Toggling ..
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const icon = this.querySelector('i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
});


// registration code is here .
const resultMessage = document.querySelector(".text-center");
const registrationForm = document.querySelector("#registration-form");
registrationForm.addEventListener("submit", function (event) {
    event.preventDefault()

    // get users From local.stroage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // targeted
    const names = event.target.fullname.value
    const email = event.target.email.value;
    const cnic = event.target.cnic.value;
    const passsword = event.target.password.value
    // Target Genders Fields.

    const selectedGender = document.querySelector('input[name="gender"]:checked');
    let gender = "";
    if (selectedGender) {
        gender = selectedGender.value;

    }

    // userExist
    const userExist = users.find(item => item.email === email && item.name===name)

    if (userExist) {
        resultMessage.textContent = "Your are Already Exist Please Login🤔";
        resultMessage.style.color = 'red'
        location.href = "../index.html"
        return;
        



    }


    // conditions....
    function conditions(text, textColor) {
        resultMessage.textContent = text;
        resultMessage.style.color = textColor;
    }

    if (names.trim() === "" || !isNaN(names)) {
        conditions("Please Enter Your Name", "red")

    }

    else if (email.trim() === "" || !email.includes("@")) {
        conditions("Please Enter Your Email", "red")

    }

    else if (cnic.trim() === "" || cnic.length <= 4) {
        conditions("Please Enter Your CNIC", "red")

    }

    else if (passsword.trim() === "" || passsword.length <= 4) {
        conditions("Please Enter Your Password", "red")

    }



    else {
        const user = {
            names, email, passsword, cnic,gender
        }
        users.push(user)
        
        conditions(`Account Created For :  ${names}`,"green")

        

        localStorage.setItem('users', JSON.stringify(users))

        event.target.reset();



    }



})