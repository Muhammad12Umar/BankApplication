
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
    const balance = +event.target.balance.value;
    const password = event.target.password.value
    const phone=event.target.phone.value;
    const dob=event.target.dob.value;
    const accountType=event.target.accountType.value;
    const confirmPassword=event.target.confirmPassword.value;

    // funtion Messaging .
    function showMessage  (text,color) {
    resultMessage.textContent=text;
    resultMessage.style.color=color;
        
    }
    


    // Target Genders Fields.

    const selectedGender = document.querySelector('input[name="gender"]:checked');
    let gender = "";
    if (selectedGender) {
        gender = selectedGender.value;

    }

    // userExist
    const userExist = users.find(item => item.email === email)

    if (userExist) {
        resultMessage.textContent = "Your are Already Exist Please Login🤔";
        resultMessage.style.color = 'red'
        location.href = "../index.html"
        return;
        
    }
    else if (password !=confirmPassword){
        resultMessage.textContent="Password Donot Match";
        resultMessage.style.color='red'
    }

    else{

        const user = {
            names, email, password, balance,gender,phone,dob,accountType,confirmPassword
        }
        users.push(user)
        
        showMessage(`Account Created For :  ${names}`,"green")

        

        localStorage.setItem('users', JSON.stringify(users))

        event.target.reset();

    }


   





    



})