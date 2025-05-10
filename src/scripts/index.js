import '../pages/index.css';
import * as cards from './cards.js';
import * as modal from './components/modal.js';

const cardTemplate = document.querySelector('#card-template');
const cardContainer = document.querySelector('.places__list');

cards.initialCards.forEach((card) => {
  cardContainer.append(cards.createCard(card, cardTemplate, cards.deleteCardCallback, cards.openCardImageCallback, cards.likeCardCallback));
});

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditModal = document.querySelector('.popup_type_edit');
const profileEditFormElement = document.querySelector('.popup__form[name=edit-profile');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileNameInput = profileEditModal.querySelector('input[name=name');
const profileDescriptionInput = profileEditModal.querySelector('input[name=description]');

profileEditButton.addEventListener('click', (e) => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  modal.openModal(profileEditModal);
});

profileEditFormElement.addEventListener('submit', (e) => {
  e.preventDefault();

  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
});

const addCardButton = document.querySelector('.profile__add-button');
const addCardModal = document.querySelector('.popup_type_new-card');
const addCardFormElement = document.querySelector('.popup__form[name=new-place');

addCardButton.addEventListener('click', (e) => {
  modal.openModal(addCardModal);
});

const placeNameInput = addCardModal.querySelector('input[name=place-name]');
const linkInput = addCardModal.querySelector('input[name=link]');

addCardFormElement.addEventListener('submit', (e) => {
  e.preventDefault();

  const cardData = {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  cardContainer.prepend(cards.createCard(cardData, cardTemplate, cards.deleteCardCallback, cards.openCardImageCallback, cards.likeCardCallback));

  addCardFormElement.reset();
  modal.closeModal(addCardModal);
});
