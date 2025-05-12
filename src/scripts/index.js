import '../pages/index.css';
import { cards } from './cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { closeModal, openModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';

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

const profileNameInput = profileEditModal.querySelector('input[name=name]');
const profileDescriptionInput = profileEditModal.querySelector('input[name=description]');

const addCardButton = document.querySelector('.profile__add-button');
const addCardModal = document.querySelector('.popup_type_new-card');
const addCardFormElement = document.querySelector('.popup__form[name=new-place]');

const placeNameInput = addCardModal.querySelector('input[name=place-name]');
const linkInput = addCardModal.querySelector('input[name=link]');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
      closeModal(modal);
    }
  });
});

cards.forEach((card) => {
  cardContainer.append(createCard(card, cardTemplate, deleteCard, openCardImage, likeCard));
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

  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

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
