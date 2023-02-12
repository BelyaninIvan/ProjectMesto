const popupImgZoom = document.querySelector('.popup_type_image');
const imageElement = popupImgZoom.querySelector('.popup__img');
const captionElement = popupImgZoom.querySelector('.popup__caption');
const Esc_Keycode = 27;

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

class Card {
    constructor(data, cardSelector) {
        this._cardSelector = cardSelector;

        this._title = data.name;
        this._link = data.image;
    }

    _getTemplate() {
        const CardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return CardElement;
    }

    _likeIconHandler() {
        this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
    }

    _deleteCardHandler() {
        this._element.remove();
        this._element = null;
    }

    _zoomImgHandler() {
        imageElement.src = this._link;
        imageElement.alt = `Изображение ${this._link}`;
        captionElement.textContent = this._title;
        
        popupImgZoom.classList.add('popup_opened');
        document.addEventListener('keyup', handleEscUp);
    }

    _setEventListeners() {
        this._element.querySelector('.card__like-button').addEventListener('click', () => this._likeIconHandler());

        this._element.querySelector('.card__delete-button').addEventListener('click', () => this._deleteCardHandler());

        this._element.querySelector('.card__img').addEventListener('click', () => this._zoomImgHandler());
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.card__img').setAttribute('src', this._link);
        this._element.querySelector('.card__title').textContent = this._title;

        return this._element;
    }
}

export default Card;