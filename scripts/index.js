// Находим форму в DOM
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let popupCloseBtn = document.querySelector('.popup__button-close');
let profileEditBtn = document.querySelector('.profile__edit-button');
let nameInput = document.querySelector('.popup__input_type_name');
let descrInput = document.querySelector('.popup__input_type_description');
let nameProfile = document.querySelector('.profile__name');
let descrProfile = document.querySelector('.profile__description');

function popupOpen() {
    popup.classList.add('popup_opened');
    nameInput.value = nameProfile.textContent;
    descrInput.value = descrProfile.textContent;
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    descrProfile.textContent = descrInput.value;
    popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);
popupCloseBtn.addEventListener('click', popupClose);
profileEditBtn.addEventListener('click', popupOpen);