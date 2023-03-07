/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    AKAI Frontend Task - Javascript

    W tym zadaniu postaraj się zaimplementować metody, które sprawdzą, czy dane wprowadzone
    do formularza są poprawne. Przykładowo: czy imię i nazwisko zostało wprowadzone.
    Możesz rozwinąć walidację danych tak bardzo, jak tylko zapragniesz.

    Powodzenia!
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
const firstnameIn = document.getElementById("first-name");
const lastnameIn = document.getElementById("last-name");
const emailIn = document.getElementById("email");

const checkboxes = document.getElementsByName("section");

const form = document.getElementById("akai-form");

const checkCheckboxes = () => {
  let valid = false;

  const checkboxesChecked = [];
  for (i in checkboxes) {
    if (checkboxes[i].checked) {
      checkboxesChecked.push(checkboxes[i]);
    }
  }
  if (checkboxesChecked.length) {
    showSuccess(document.getElementById("checkboxes"));
    valid = true;
  } else {
    showError(
      document.getElementById("checkboxes"),
      "Proszę wybrać co najmniej jedną opcję."
    );
  }
  return valid;
};

const checkFirstname = () => {
  let valid = false;
  const firstname = firstnameIn.value.trim();
  if (!isRequired(firstname)) {
    showError(firstnameIn, "Pole imienia nie może być puste.");
  } else {
    showSuccess(firstnameIn);
    valid = true;
  }
  return valid;
};

const checkLastname = () => {
  let valid = false;
  const lastname = lastnameIn.value.trim();
  if (!isRequired(lastname)) {
    showError(lastnameIn, "Pole nazwiska nie może być puste.");
  } else {
    showSuccess(lastnameIn);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailIn.value.trim();
  if (!isRequired(email)) {
    showError(emailIn, "Pole emaila nie może być puste.");
  } else if (!isEmailValid(email)) {
    showError(emailIn, "Wprowadź prawidłowy email.");
  } else {
    showSuccess(emailIn);
    valid = true;
  }
  return valid;
};

const isRequired = (value) => {
  return value === "" ? false : true;
};

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");

  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  const formField = input.parentElement;

  formField.classList.remove("error");
  formField.classList.add("success");

  const error = formField.querySelector("small");
  error.textContent = "";
};

const resetField = (input) => {
  const formField = input.parentElement;

  formField.classList.remove("error");
  formField.classList.remove("success");
};

const sendForm = () => {
  const formSent = document.getElementById("form-sent");
  formSent.classList.remove("message-hidden");
  formSent.classList.add("message-visible");
  formSent.textContent = "Zgłoszenie zostało wysłane.";

  resetField(firstnameIn);
  resetField(lastnameIn);
  resetField(emailIn);

  setTimeout(() => {
    formSent.classList.remove("message-visible");
    formSent.classList.add("message-hidden");
    formSent.textContent = "";
  }, 5000);

  const checkboxesChecked = [];
  for (i in checkboxes) {
    if (checkboxes[i].checked) {
      checkboxesChecked.push(checkboxes[i].value);
    }
  }

  console.log("Firstname: ", firstnameIn.value.trim());
  console.log("Lastname: ", lastnameIn.value.trim());
  console.log("Email: ", emailIn.value.trim());
  console.log("Checked options: ", checkboxesChecked);

  form.reset();
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let isFirstnameValid = checkFirstname();
  let isLastnameValid = checkLastname();
  let isEmailValid = checkEmail();
  let isCheckboxValid = checkCheckboxes();

  let isFormValid =
    isFirstnameValid && isLastnameValid && isEmailValid && isCheckboxValid;
  if (isFormValid) {
    sendForm();
  }
});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "first-name":
        checkFirstname();
        break;
      case "last-name":
        checkLastname();
        break;
      case "email":
        checkEmail();
        break;
      case "frontend-checkbox":
        checkCheckboxes();
        break;
      case "backend-checkbox":
        checkCheckboxes();
        break;
      case "mobile-checkbox":
        checkCheckboxes();
        break;
      case "graphics-checkbox":
        checkCheckboxes();
        break;
    }
  })
);
