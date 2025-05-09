import '../pages/index.css';
import { initialCards } from './cards.js';
import * as popup from './popup.js';
import './edit_profile.js';
import './add_card.js';

import * as all from './popup.js';

const cardTemplate = document.querySelector('#card-template');
const cardContainer = document.querySelector('.places__list');
const cardImagePopup = document.querySelector('.popup_type_image');

const deleteCardCallback = function (card) {
  card.remove();
};

function imagePopupCallback(cardImageSrc, cardImageName) {
  const image = cardImagePopup.querySelector('img');

  image.src = cardImageSrc;
  image.alt = cardImageName;

  cardImagePopup.querySelector('.popup__caption').textContent = cardImageName;

  popup.openPopup(cardImagePopup);
}

initialCards.forEach((card) => {
  cardContainer.append(createCard(card, deleteCardCallback, imagePopupCallback, cardTemplate));
});

function createCard(data, deleteCallback, imagePopupCallback, template) {
  const fragment = template.content.cloneNode(true);

  const cardItem = fragment.querySelector('.card');
  const cardImage = fragment.querySelector('.card__image');
  cardImage.src = data.link;
  cardImage.name = data.name;

  fragment.querySelector('.card__delete-button').addEventListener('click', () => {
    deleteCallback(cardItem);
  });
  fragment.querySelector('.card__title').textContent = data.name;

  cardImage.addEventListener('click', () => {
    imagePopupCallback(cardImage.src, cardImage.name);
  });

  return fragment;
}
