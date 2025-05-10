import { openModal } from './modal.js';

const cardImageModal = document.querySelector('.popup_type_image');

export function createCard(data, template, deleteCardCallback, openCardImageCallback, likeCardCallback) {
  const fragment = template.content.cloneNode(true);

  const cardItem = fragment.querySelector('.card');
  const cardImage = fragment.querySelector('.card__image');
  cardImage.src = data.link;
  cardImage.name = data.name;

  fragment.querySelector('.card__delete-button').addEventListener('click', () => {
    deleteCardCallback(cardItem);
  });
  fragment.querySelector('.card__title').textContent = data.name;

  const likeButton = fragment.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => {
    likeCardCallback(likeButton);
  });

  cardImage.addEventListener('click', () => {
    openCardImageCallback(cardImage.src, cardImage.name);
  });

  return fragment;
}

export function deleteCard(card) {
  card.remove();
}

export function openCardImage(cardImageSrc, cardImageName) {
  const image = cardImageModal.querySelector('img');

  image.src = cardImageSrc;
  image.alt = cardImageName;

  cardImageModal.querySelector('.popup__caption').textContent = cardImageName;

  openModal(cardImageModal);
}

export function likeCard(button) {
  button.classList.toggle('card__like-button_is-active');
}
