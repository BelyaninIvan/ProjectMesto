const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const submitButton = formElement.querySelector('.popup__submit-button');
    inputElement.classList.add('popup__input_type_error');
    submitButton.classList.add('popup__submit-button_inactive');
    submitButton.setAttribute('disable', true);
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const submitButton = formElement.querySelector('.popup__submit-button');
    inputElement.classList.remove('popup__input_type_error');
    submitButton.classList.remove('popup__submit-button_inactive');
    submitButton.removeAttribute('disable', false);
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
}

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
          });
        setEventListeners(formElement);
    });
};

enableValidation();

/* {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: '.popup__submit-button_inactive',
    inputErrorClass: '.popup__input_type_error',
    errorClass: '.popup__input-error_active'
} */