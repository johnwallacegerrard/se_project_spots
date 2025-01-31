const showInputError = (formElement, inputElement) => {
  const errorMessageID = formElement.id + "-error";
  const errorElement = document.querySelector("#" + errorMessageID);
  errorElement.classList.add("modal__error_shown");
};

const hideInputError = (formElement, inputElement) => {
  const errorMessageID = formElement.id + "-error";
  const errorElement = document.querySelector("#" + errorMessageID);
  errorElement.classList.remove("modal__error_shown");
};

const checkInputValidity = (formElement, inputElement) => {
  if (!formElement.validity.valid) {
    showInputError(formElement, inputElement);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputs) => {
  return !inputs.validity.valid;
};

const disableButton = (buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add("modal__save-btn_inactive");
};

const enableButton = (buttonElement) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove("modal__save-btn_inactive");
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    enableButton(buttonElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = formElement.querySelectorAll(".modal__input");
  const buttonElement = formElement.querySelector(".modal__save-btn");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(inputElement, buttonElement);
      toggleButtonState(inputElement, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();
