import * as modal from './components/modal.js';

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const cardImageModal = document.querySelector('.popup_type_image');

export function createCard(data, template, deleteFunction = deleteCardCallback, openImageFunctuin = openCardImageCallback) {
  const fragment = template.content.cloneNode(true);

  const cardItem = fragment.querySelector('.card');
  const cardImage = fragment.querySelector('.card__image');
  cardImage.src = data.link;
  cardImage.name = data.name;

  fragment.querySelector('.card__delete-button').addEventListener('click', () => {
    deleteCardCallback(cardItem);
  });
  fragment.querySelector('.card__title').textContent = data.name;

  cardImage.addEventListener('click', () => {
    openCardImageCallback(cardImage.src, cardImage.name);
  });

  return fragment;
}

function deleteCardCallback(cardItem) {
  cardItem.remove();
}

function openCardImageCallback(cardImageSrc, cardImageName) {
  const image = cardImageModal.querySelector('img');

  image.src = cardImageSrc;
  image.alt = cardImageName;

  cardImageModal.querySelector('.popup__caption').textContent = cardImageName;

  modal.openModal(cardImageModal);
}
