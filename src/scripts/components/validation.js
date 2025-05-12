export function enableValidation(validationConfig) {
  const formList = document.querySelectorAll(validationConfig.formSelector);
  formList.forEach((form) => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
    });

    setEventListeners(form, validationConfig);
  });
}

export function clearValidation(form, validationConfig) {
  const submitButton = form.querySelector(validationConfig.submitButtonSelector);

  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((input) => {
    checkInputValidity(form, input, validationConfig);
  });

  toggleButtonState(inputList, submitButton, validationConfig.inactiveButtonClass);
}

function setEventListeners(form, validationConfig) {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));

  const submitButton = form.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, submitButton, validationConfig.inactiveButtonClass);

  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      checkInputValidity(form, input, validationConfig);

      toggleButtonState(inputList, submitButton, validationConfig.inactiveButtonClass);
    });
  });
}

function toggleButtonState(inputList, submitButton, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

function checkInputValidity(form, input, validationConfig) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }

  if (!input.validity.valid) {
    console.log(input.validationMessage);
    showInputError(form, input, input.validationMessage, validationConfig.inputErrorClass, validationConfig.errorClass);
  } else {
    hideInputError(form, input, validationConfig.inputErrorClass, validationConfig.errorClass);
  }
}

function showInputError(form, input, errorMessage, inputErrorClass, errorVisibleClass) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorVisibleClass);
}

function hideInputError(form, input, inputErrorClass, errorVisibleClass) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorVisibleClass);
  errorElement.textContent = '';
}
