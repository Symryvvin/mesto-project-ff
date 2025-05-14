import '../pages/index.css';
import { createCard, deleteCard, likeCard, isLikedByMe } from './components/card.js';
import { closeModal, openModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
  getProfileInfo,
  getInitialCards,
  updateProfile,
  addNewCard,
  deleteCardById,
  likeCardById,
  unlikeCardById,
  updateProfileAvatar,
} from './components/api.js';

const modals = document.querySelectorAll('.popup');

const cardTemplate = document.querySelector('#card-template');
const cardContainer = document.querySelector('.places__list');
const cardImageModal = document.querySelector('.popup_type_image');
const cardImageElement = cardImageModal.querySelector('img');
const cardCaptionElement = cardImageModal.querySelector('.popup__caption');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditModal = document.querySelector('.popup_type_edit');
const profileEditFormElement = document.querySelector('.popup__form[name=edit-profile]');
const profileAvatarContainer = document.querySelector('.profile__image-container');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const profileEditAvatarModal = document.querySelector('.popup_type_avatar');
const profileAvatarLinkInput = profileEditAvatarModal.querySelector('input[name=link]');
const profileEditAvatarFormElement = profileEditAvatarModal.querySelector('.popup__form[name=edit-avatar]');

const profileNameInput = profileEditModal.querySelector('input[name=name]');
const profileDescriptionInput = profileEditModal.querySelector('input[name=description]');

const addCardButton = document.querySelector('.profile__add-button');
const addCardModal = document.querySelector('.popup_type_new-card');
const addCardFormElement = document.querySelector('.popup__form[name=new-place]');
const deleteCardConfirmModal = document.querySelector('.popup_type_delete_confirm');
const deleteCardConfirmFormElement = deleteCardConfirmModal.querySelector('.popup__form[name=delete-confirm]');

const placeNameInput = addCardModal.querySelector('input[name=place-name]');
const linkInput = addCardModal.querySelector('input[name=link]');

const errorModal = document.querySelector('.popup_type_error');
const errorTitle = errorModal.querySelector('.popup__title');
const errorMessage = errorModal.querySelector('.popup__error-message');

let userId;
let handleSubmitConfirmModal;

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
    userId = user._id;

    const cards = res[1];

    cards.forEach((card) => {
      cardContainer.append(createCard(card, cardTemplate, onDeleteCardClick, openCardImage, onLikeCardClick, userId));
    });
  })
  .catch(showError);

function showError(err) {
  errorTitle.textContent = `Ошибка ${err.code}`;
  errorMessage.textContent = err.message;

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

  setSubmitButtonText(profileEditFormElement, 'Сохранение...');

  updateProfile(profileNameInput.value, profileDescriptionInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;

      closeModal(profileEditModal);
    })
    .catch(showError)
    .finally(() => setSubmitButtonText(profileEditFormElement, 'Сохранить'));
}

profileEditFormElement.addEventListener('submit', handleProfileEditForm);

function setSubmitButtonText(form, text) {
  form.querySelector('.popup__button').textContent = text;
}

addCardButton.addEventListener('click', (e) => {
  clearValidation(addCardFormElement, validationConfig);

  openModal(addCardModal);
});

function handleAddCardForm(e) {
  e.preventDefault();

  setSubmitButtonText(addCardFormElement, 'Сохранение...');

  addNewCard(placeNameInput.value, linkInput.value)
    .then((card) => {
      cardContainer.prepend(createCard(card, cardTemplate, onDeleteCardClick, openCardImage, onLikeCardClick, userId));

      addCardFormElement.reset();

      closeModal(addCardModal);
    })
    .catch(showError)
    .finally(() => setSubmitButtonText(addCardFormElement, 'Сохранить'));
}

addCardFormElement.addEventListener('submit', handleAddCardForm);

function onDeleteCardClick(cardId, card) {
  deleteCardConfirmFormElement.removeEventListener('submit', handleSubmitConfirmModal);

  handleSubmitConfirmModal = function () {
    deleteCardById(cardId)
      .then(() => {
        deleteCard(card);

        closeModal(deleteCardConfirmModal);
      })
      .catch(showError);
  };

  deleteCardConfirmFormElement.addEventListener('submit', handleSubmitConfirmModal);

  openModal(deleteCardConfirmModal);
}

function onLikeCardClick(card, likeButton, likeCounter) {
  if (isLikedByMe(card.likes, userId)) {
    unlikeCardById(card._id)
      .then((response) => {
        likeCard(card, response.likes, likeButton, likeCounter, false);
      })
      .catch(showError);
  } else {
    likeCardById(card._id)
      .then((response) => {
        likeCard(card, response.likes, likeButton, likeCounter, true);
      })
      .catch(showError);
  }
}

profileAvatarContainer.addEventListener('click', (e) => {
  profileAvatarLinkInput.value = profileAvatar.src;

  clearValidation(profileEditAvatarFormElement, validationConfig);

  openModal(profileEditAvatarModal);
});

profileEditAvatarFormElement.addEventListener('submit', handleProfileEditAvatarForm);

function handleProfileEditAvatarForm(e) {
  e.preventDefault();

  setSubmitButtonText(profileEditAvatarFormElement, 'Сохранение...');

  updateProfileAvatar(profileAvatarLinkInput.value)
    .then((response) => {
      profileAvatar.src = response.avatar;

      closeModal(profileEditAvatarModal);
    })
    .catch(showError)
    .finally(() => setSubmitButtonText(profileEditAvatarFormElement, 'Сохранить'));
}

enableValidation(validationConfig);
