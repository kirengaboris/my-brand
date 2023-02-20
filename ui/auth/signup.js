const form = document.getElementById('signup-form');
const { username, email, password } = form;

const signup = async (payload) => {
  try {
    const response = await fetch(
      'https://boris-47i2.onrender.com/api/signup',

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
      setSuccess(form.email);
      location.href = '/index.html#login';
    } else {
      setInvalid(form.email, data.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (inputCheck(form)) {
    const payload = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
    };
    signup(payload);
  }
});

function inputCheck(form) {
  let required = true;

  if (form.username.value.trim() === '') {
    setInvalid(form.username, 'Username is required');
    required = false;
  }
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
