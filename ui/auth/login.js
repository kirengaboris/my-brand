const form = document.getElementById("login-form");
const { email, password} = form

form.addEventListener("submit", e => {
    e.preventDefault();

    const emailValue = email.value;
    const passwordValue = password.value;

    if(inputCheck(form)){
       if(isAdmin(emailValue,passwordValue)){
        location.href="/ui/admin/admin-panel.html";
       } 
       else{
        location.href="/index.html"
       }
    }   
})

function inputCheck (form){
    let required = true;

    if(form.email.value.trim() === ""){
        setInvalid(form.email, "Email is required");
        required = false;
    }
    else if(!validEmail(form.email.value)){
        setInvalid(form.email, "Email is Invalid");
        required = false;
    }
    else{
        setSuccess(form.email)
    }
    if(form.password.value.trim() === ""){
        setInvalid(form.password, "Password is required");
        required = false;
    }
    else{
        setSuccess(form.password)
    }

    return required;
}

function setInvalid (input , message){
    const inputLabel = input.parentElement;
    const inputError = inputLabel.querySelector("#error-msg");
    inputLabel.className = "invalid-logins";
    inputError.innerHTML = message;
}

function setSuccess(input){
    const inputLabel = input.parentElement;
    const inputError = inputLabel.querySelector("#error-msg");
    inputLabel.className = "success";
    inputError.innerHTML = "";
}

function validEmail  (email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email.toLowerCase())
  }

function isAdmin(email,password){
    let admin = true;

    if(email === "boris@gmail.com" && password === "123456"){}
    else{
        admin = false;
    }

    return admin;
}

