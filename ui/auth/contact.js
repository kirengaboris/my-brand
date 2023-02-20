const fullName = document.getElementById('name');
const gmail = document.getElementById('email');
const message = document.getElementById('message');
const errorMessage1 = document.getElementById('error-msg1');
const errorMessage2 = document.getElementById('error-msg2');
const errorMessage3 = document.getElementById('error-msg3');
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  checkMessage(fullName, gmail, message);
  const formData = new FormData(contactForm);
  const payload = {
    name: formData.get('names'),
    email: formData.get('email'),
    message: formData.get('message'),
  };
  fetch('https://boris-47i2.onrender.com/api/queries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
});

// contactForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const formData = new FormData(contactForm);
//   const payload = {
//     name: formData.get('names'),
//     email: formData.get('email'),
//     message: formData.get('message'),
//   };

// });
// function sendQuery(payload) {
//   const response = fetch('https://boris-47i2.onrender.com/api/queries', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   });
//   return response.json;
// }

function validEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

function checkMessage(fullName, gmail, message) {
  let validMessage;

  if (fullName.value === '' || fullName.value == null) {
    errorMessage1.innerHTML = 'Name is required';
    fullName.classList.add('invalid-contacts');
    validMessage = false;
  } else {
    if (fullName.value.length < 3) {
      errorMessage1.innerHTML = 'Too short for a name';
      fullName.classList.add('invalid-contacts');
      validMessage = false;
    }
  }
  if (gmail.value === '' || gmail.value == null) {
    errorMessage2.innerHTML = 'Email is required';
    gmail.classList.add('invalid-contacts');
    validMessage = false;
  } else {
    if (!validEmail(gmail.value)) {
      errorMessage2.innerHTML = 'Email is invalid';
      gmail.classList.add('invalid-contacts');
      validMessage = false;
    }
  }
  if (message.value === '' || message.value == null) {
    errorMessage3.innerHTML = 'Message is required';
    message.classList.add('invalid-contacts');
    validMessage = false;
  } else {
    if (message.value.length < 4) {
      errorMessage3.innerHTML = 'Too short for a message';
      message.classList.add('invalid-contacts');
      validMessage = false;
    }
  }
  if (
    fullName.value.length > 1 &&
    validEmail(gmail.value) &&
    gmail.value.length > 0 &&
    message.value.length > 0
  ) {
    function showAlert() {
      swal('Message Sent', '', 'success');
    }
    showAlert();
    setTimeout(function () {
      location.reload();
    }, 2000);
  }

  return validMessage;
}
