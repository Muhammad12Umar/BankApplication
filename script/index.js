const result = document.querySelector(".text-center");
const registrationForm = document.querySelector("#registration-form");

registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = event.target.email.value;
    const names = event.target.fullname.value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(item => item.names.trim() === names && item.email === email);

    function message(text, textColor) {
        result.textContent = text;
        result.style.color = textColor;
    }

    if (user) {
        message("Successfully Login. 🤷‍♀️", "green");

        // Save the login user in localStorage
        const LoginUser = { names, email };
     
        
        localStorage.setItem("LoginUsers", JSON.stringify(LoginUser));

        // Redirect after a short delay (optional)
        setTimeout(() => {
            location.href = "../pages/DashBoard.html";
        }, 1000);
    } else {
        message("Please Register. 🤦‍♂️", "red");
    }

    event.target.reset();
});
