const result=document.querySelector(".text-center")
const registrationForm=document.querySelector("#registration-form");
registrationForm.addEventListener("submit",function(event){
    event.preventDefault();
   
    const email=event.target.email.value;

    const users=JSON.parse(localStorage.getItem("users"))
    
    const user=users.find(item=>item.email===email)

    function message (text,textColor){
    result.textContent=text;
    result.style.color=textColor;

    }

    if (user){
        message("Successfully Login.🤷‍♀️ ","green")
        location.href="../pages/DashBoard.html"
      

    }
    else {
        message("Please Register. 🤦‍♂️",'red');

    }
    

    

    
    event.target.reset();

})