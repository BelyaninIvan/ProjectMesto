import Card from './Card.js';
import FormValidator from './FormValidator.js';

const Esc_Keycode = 27;

const initialCards = [
    {
        name: 'Саратов',
        image: 'images/saratov.jpg'
    },
    {
        name: 'Казань',
        image: 'images/kazan.jpg'
    },
    {
        name: 'Москва',
        image: 'images/moscow.jpg'
    },
    {
        name: 'Санкт-Петербург',
        image: 'images/saint-petersburg.jpg'
    },
    {
        name: 'Сочи',
        image: 'images/sochi.jpg'
    },
    {
        name: 'Владивосток',
        image: 'images/vladivostok.jpg'
    }
];

const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_addcard');
const popupImgZoom = document.querySelector('.popup_type_image');

const editProfileformElement = popupEditProfile.querySelector('.popup__form');
const addCardformElement = popupAddCard.querySelector('.popup__form');

const editProfileCloseBtn = popupEditProfile.querySelector('.popup__button-close');
const addCardCloseBtn = popupAddCard.querySelector('.popup__button-close');
const imageZoomCloseBtn = popupImgZoom.querySelector('.popup__button-close');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const descrInput = popupEditProfile.querySelector('.popup__input_type_description');
const cardNameInput = popupAddCard.querySelector('.popup__input_type_cardName');
const cardImageInput = popupAddCard.querySelector('.popup__input_type_cardImage');
const imageElement = popupImgZoom.querySelector('.popup__img');
const captionElement = popupImgZoom.querySelector('.popup__caption');

const nameProfile = document.querySelector('.profile__name');
const descrProfile = document.querySelector('.profile__description');

let cardList = document.querySelector('.cards__list');
const cardSelector = '#card-template';

const defaultFormConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}
const openModalWindow = (modalWindow) => {
    modalWindow.classList.add('popup_opened');
    document.addEventListener('keyup', handleEscUp);
};

const closeModalWindow = (modalWindow) => {
    modalWindow.classList.remove('popup_opened');
    document.removeEventListener('keyup', handleEscUp);
};

const isEscClick = (evt, action) => {
    const activePopup = document.querySelector('.popup_opened');
    if (evt.which === Esc_Keycode) {
        action(activePopup);
    };
};

const handleEscUp = (evt) => {
    evt.preventDefault();
    isEscClick(evt, closeModalWindow);
};

const formSubmitHandler = (evt) => {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    descrProfile.textContent = descrInput.value;
    closeModalWindow(popupEditProfile);
};
editProfileformElement.addEventListener('submit', formSubmitHandler);

const addCardSubmitHandler = (evt) => {
    evt.preventDefault();
    renderCard({
        image: cardImageInput.value, 
        name: cardNameInput.value
    }, cardList);
    closeModalWindow(popupAddCard);
};
addCardformElement.addEventListener('submit', addCardSubmitHandler);

profileEditBtn.addEventListener('click', () => {
    openModalWindow(popupEditProfile);
    nameInput.value = nameProfile.textContent;
    descrInput.value = descrProfile.textContent;
});

profileAddButton.addEventListener('click', () => {
    cardImageInput.value = '';
    cardNameInput.value = '';
    openModalWindow(popupAddCard);
});

const zoomImgHandler = (data) => {
    imageElement.src = data.image;
    imageElement.alt = `Изображение ${data.name}`;

    captionElement.textContent = data.name;
    openModalWindow(popupImgZoom);
};

editProfileCloseBtn.addEventListener('click', () => closeModalWindow(popupEditProfile));
addCardCloseBtn.addEventListener('click', () => closeModalWindow(popupAddCard));
imageZoomCloseBtn.addEventListener('click', () => closeModalWindow(popupImgZoom));

popupEditProfile.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        closeModalWindow(popupEditProfile);
    };
});

popupAddCard.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        closeModalWindow(popupAddCard);
    };
});

popupImgZoom.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        closeModalWindow(popupImgZoom);
    };
});

const renderCard = (data, wrap) => {
    const card = new Card(data, cardSelector);
    wrap.prepend(card.generateCard());
}

initialCards.forEach((data) => {
    renderCard(data, cardList);
});

const editFormValidation = new FormValidator(defaultFormConfig, popupEditProfile);
const cardFormValidation = new FormValidator(defaultFormConfig, popupAddCard);

editFormValidation.enableValidation();
cardFormValidation.enableValidation();