import '../pages/index.css';
import { initialCards } from './cards.js';

const cardTemplate = document.querySelector('#card-template');
const cardContainer = document.querySelector('.places__list');

const deleteCardCallback = function (item) {
  item.remove();
};

initialCards.forEach((card) => {
  cardContainer.append(createCard(card, deleteCardCallback, cardTemplate));
});

function createCard(data, deleteCallback, template) {
  const fragment = template.content.cloneNode(true);

  const cardItem = fragment.querySelector('.card');
  const cardImage = fragment.querySelector('.card__image');
  cardImage.src = data.link;
  cardImage.name = data.name;

  console.log(cardImage);
  fragment.querySelector('.card__delete-button').addEventListener('click', () => {
    deleteCallback(cardItem);
  });
  fragment.querySelector('.card__title').textContent = data.name;

  return fragment;
}
