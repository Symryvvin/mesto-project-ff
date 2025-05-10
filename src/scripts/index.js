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

  const nameInput = profileEditModal.querySelector('.popup__input_type_name');
  const jobInput = profileEditModal.querySelector('.popup__input_type_description');

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  function handleFormSubmit(e) {
    e.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
  }

  formElement.addEventListener('submit', handleFormSubmit);

  modal.openModal(profileEditModal);
});

const addCardButton = document.querySelector('.profile__add-button');
const addCardModal = document.querySelector('.popup_type_new-card');

addCardButton.addEventListener('click', (e) => {
  modal.openModal(addCardModal);
});
