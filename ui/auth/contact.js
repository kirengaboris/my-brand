const fullName = document.getElementById("name");
const gmail = document.getElementById("email");
const message = document.getElementById("message");
const errorMessage1 = document.getElementById("error-msg1");
const errorMessage2 = document.getElementById("error-msg2");
const errorMessage3 = document.getElementById("error-msg3");
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", e =>{
    e.preventDefault();

    let fullNames = fullName.value;
    let email = gmail.value;
    let messages = message.value;

   if(checkMessage(fullNames,email,messages)){
    person = {
        names : fullNames,
        theEmail : email,
        theMessage : messages
    }

    localStorage.setItem(email,JSON.stringify(person));
    location.reload();   
   }  
})

function validEmail  (email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email.toLowerCase())
  }

function checkMessage (fullNames,email,messages){
    let validMessage = true;

    if(fullName.value === "" || fullName.value == null){
        errorMessage1.innerHTML = "Name is required";
        fullName.classList.add("invalid-contacts");
        validMessage = false;
    }
    if(gmail.value === "" || gmail.value == null){
        errorMessage2.innerHTML = "Email is required";
        gmail.classList.add("invalid-contacts");
        validMessage = false;
    }
    else{
        if(!validEmail(gmail.value)){
             errorMessage2.innerHTML = "Email is invalid"
             gmail.classList.add("invalid-contacts");
             validMessage = false;
        } 
     }
    if(message.value ===  "" || message.value == null){
        errorMessage3.innerHTML = "Message is required";
        message.classList.add("invalid-contacts");
        validMessage = false;
    }

    return validMessage;
}


