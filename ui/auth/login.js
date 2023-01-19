const form = document.getElementById("login-form");
const { email, password} = form

form.addEventListener("submit", e => {
    e.preventDefault();

    if(inputCheck(form)){
       if(isEmail(email.value) && isPassword(password.value)){
        location.href="/ui/admin/admin-panel.html";
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
        if(isEmail(form.email.value)){
            setSuccess(form.email)
        }
        else{
            setInvalid(form.email, "Email Incorrect")
        }   
    }
    if(form.password.value.trim() === ""){
        setInvalid(form.password, "Password is required");
        required = false;
    }
    else{
        if(isPassword(form.password.value)){
            setSuccess(form.password)
        }
        else{
            setInvalid(form.password, "Password Incorrect");
        } 
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

function isEmail(email){
    let correctE = true;

    if(email === "boris@gmail.com"){}
    else{
        correctE = false
    }
     return correctE
}

function isPassword(password){
    let correctP = true;

    if(password === "123456"){}
     else{
        correctP = false;
    }
    return correctP;
}

