const form = document.getElementById('login-form');
const { email, password } = form;

const login = async (payload) => {
  try {
    const response = await fetch(
      'https://boris-47i2.onrender.com/api/login',

      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'content-type': 'application/json',
        },
      },
    );

    const data = await response.json();
    console.log(data);
    if (data.success === true) {
      localStorage.setItem('token', JSON.stringify(data.token));
      const payload = JSON.parse(atob(data.token.split('.')[1]));

      console.log(payload);
      if (payload.isAdmin == true) {
        location.href = '/ui/admin/admin-panel.html';
      } else {
        location.href = '/index.html#blogs';
      }
    } else {
      console.log('Error Logging in');
    }
  } catch (error) {
    const errorMsg = document.getElementById('error-credential');
    errorMsg.innerHTML = 'Credentials Invalid';
    console.log(error.message);
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  inputCheck(form);
  const payload = {
    email: email.value,
    password: password.value,
  };

  login(payload);
});

function inputCheck(form) {
  let required = true;

  if (form.email.value.trim() === '') {
    setInvalid(form.email, 'Email is required');
    required = false;
  } else if (!validEmail(form.email.value)) {
    setInvalid(form.email, 'Email is Invalid');
    required = false;
  }
  if (form.password.value.trim() === '') {
    setInvalid(form.password, 'Password is required');
    required = false;
  }
  return required;
}

function setInvalid(input, message) {
  const inputLabel = input.parentElement;
  const inputError = inputLabel.querySelector('#error-msg');
  inputLabel.className = 'invalid-logins';
  inputError.innerHTML = message;
}

function setSuccess(input) {
  const inputLabel = input.parentElement;
  const inputError = inputLabel.querySelector('#error-msg');
  inputLabel.className = 'success';
  inputError.innerHTML = '';
}

function validEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}
