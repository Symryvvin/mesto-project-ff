import '../pages/index.css';
import { initialCards, createCard } from './cards.js';
import * as modal from './components/modal.js';

const cardTemplate = document.querySelector('#card-template');
const cardContainer = document.querySelector('.places__list');

initialCards.forEach((card) => {
  cardContainer.append(createCard(card, cardTemplate));
});

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditModal = document.querySelector('.popup_type_edit');

profileEditButton.addEventListener('click', (e) => {
  const formElement = document.querySelector('.popup__form[name=edit-profile');

  const nameInput = profileEditModal.querySelector('input[name=name');
  const descriptionInput = profileEditModal.querySelector('input[name=description]');

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  function handleFormSubmit(e) {
    e.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
  }

  formElement.addEventListener('submit', handleFormSubmit);

  modal.openModal(profileEditModal);
});

const addCardButton = document.querySelector('.profile__add-button');
const addCardModal = document.querySelector('.popup_type_new-card');

addCardButton.addEventListener('click', (e) => {
  const formElement = document.querySelector('.popup__form[name=new-place');

  const placeNameInput = addCardModal.querySelector('input[name=place-name]');
  const linkInput = addCardModal.querySelector('input[name=link]');

  function handleFormSubmit(e) {
    e.preventDefault();

    const cardData = {
      name: placeNameInput.value,
      link: linkInput.value,
    };

    cardContainer.prepend(createCard(cardData, cardTemplate));

    modal.closeModal(addCardModal);
  }

  formElement.addEventListener('submit', handleFormSubmit, { once: true });
  formElement.reset();

  modal.openModal(addCardModal);
});
