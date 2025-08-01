const users = JSON.parse(localStorage.getItem("users")) || [];
const message = document.querySelector(".message");

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;

  const user = users.find(
    (item) => item.email === email && item.password === password
  );
  
  if (user){
    message.textContent="Successfully Login 😇";
    message.style.color='green';
    window.location.href="../pages/DashBoard.html";
    localStorage.setItem('user',JSON.stringify(user))


  }
  else{
    message.textContent='Please Register !';
    message.style.color='red';
   

  }
});
