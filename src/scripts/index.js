import '../pages/index.css';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { closeModal, openModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getProfileInfo, getInitialCards, updateProfile } from './components/api.js';

const modals = document.querySelectorAll('.popup');

const cardTemplate = document.querySelector('#card-template');
const cardContainer = document.querySelector('.places__list');
const cardImageModal = document.querySelector('.popup_type_image');
const cardImageElement = cardImageModal.querySelector('img');
const cardCaptionElement = cardImageModal.querySelector('.popup__caption');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditModal = document.querySelector('.popup_type_edit');
const profileEditFormElement = document.querySelector('.popup__form[name=edit-profile]');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const profileNameInput = profileEditModal.querySelector('input[name=name]');
const profileDescriptionInput = profileEditModal.querySelector('input[name=description]');

const addCardButton = document.querySelector('.profile__add-button');
const addCardModal = document.querySelector('.popup_type_new-card');
const addCardFormElement = document.querySelector('.popup__form[name=new-place]');

const placeNameInput = addCardModal.querySelector('input[name=place-name]');
const linkInput = addCardModal.querySelector('input[name=link]');

const errorModal = document.querySelector('.popup_type_error');
const errorMessage = document.querySelector('.popup__error-message');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

Promise.all([getProfileInfo(), getInitialCards()])
  .then((res) => {
    const user = res[0];

    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.src = user.avatar;

    const cards = res[1];

    cards.forEach((card) => {
      cardContainer.append(createCard(card, cardTemplate, deleteCard, openCardImage, likeCard));
    });
  })
  .catch((err) => showError(err));

function showError(err) {
  errorMessage.textContent = err;

  openModal(errorModal);
}

modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
      closeModal(modal);
    }
  });
});

function openCardImage(link, name) {
  cardImageElement.src = link;
  cardImageElement.alt = name;
  cardCaptionElement.textContent = name;

  openModal(cardImageModal);
}

profileEditButton.addEventListener('click', (e) => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  clearValidation(profileEditFormElement, validationConfig);

  openModal(profileEditModal);
});

function handleProfileEditForm(e) {
  e.preventDefault();

  updateProfile({
    name: profileNameInput.value,
    about: profileDescriptionInput.value,
  })
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch((err) => {
      showError(err);
    });

  closeModal(profileEditModal);
}

profileEditFormElement.addEventListener('submit', handleProfileEditForm);

addCardButton.addEventListener('click', (e) => {
  clearValidation(addCardFormElement, validationConfig);

  openModal(addCardModal);
});

function handleAddCardForm(e) {
  e.preventDefault();

  const cardData = {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  cardContainer.prepend(createCard(cardData, cardTemplate, deleteCard, openCardImage, likeCard));

  addCardFormElement.reset();
  closeModal(addCardModal);
}

addCardFormElement.addEventListener('submit', handleAddCardForm);

enableValidation(validationConfig);
