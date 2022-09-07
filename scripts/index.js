// Находим форму в DOM
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

const toggleModalWindow = (modalWindow) => {
    modalWindow.classList.toggle('popup_opened');
};

const formSubmitHandler = (evt) => {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    descrProfile.textContent = descrInput.value;
    toggleModalWindow(popupEditProfile);
};
editProfileformElement.addEventListener('submit', formSubmitHandler);

const addCardSubmitHandler = (evt) => {
    evt.preventDefault();
    renderCard({
        image: cardImageInput.value, 
        name: cardNameInput.value
    }, cardList);
    toggleModalWindow(popupAddCard);
};
addCardformElement.addEventListener('submit', addCardSubmitHandler);

profileEditBtn.addEventListener('click', () => {
    toggleModalWindow(popupEditProfile);
    nameInput.value = nameProfile.textContent;
    descrInput.value = descrProfile.textContent;
});

profileAddButton.addEventListener('click', () => {
    cardImageInput.value = '';
    cardNameInput.value = '';
    toggleModalWindow(popupAddCard);
});

const zoomImgHandler = (data) => {
    imageElement.src = data.image;
    imageElement.alt = `Изображение ${data.name}`;

    captionElement.textContent = data.name;
    toggleModalWindow(popupImgZoom);
};

editProfileCloseBtn.addEventListener('click', () => toggleModalWindow(popupEditProfile));
addCardCloseBtn.addEventListener('click', () => toggleModalWindow(popupAddCard));
imageZoomCloseBtn.addEventListener('click', () => toggleModalWindow(popupImgZoom));

const likeIconHandler = (evt) => {
    evt.target.classList.toggle('card__like-button_active');
};

const deleteCardHandler = (evt) => {
    evt.target.closest('.card').remove();
};

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

const getCardElement = (data) => {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__img');
    const cardDescription = cardElement.querySelector('.card__description');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardImage.setAttribute('src', data.image);
    cardTitle.textContent = data.name;

    cardLikeButton.addEventListener('click', likeIconHandler);
    cardDeleteButton.addEventListener('click', deleteCardHandler);
    cardImage.addEventListener('click', () => zoomImgHandler(data));

    return cardElement;
};

const renderCard = (data, wrap) => {
    wrap.prepend(getCardElement(data));
};

initialCards.forEach((data) => {
    renderCard(data, cardList);
});