import * as all from './popup.js';

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');

addCardButton.addEventListener('click', (e) => {
  all.openPopup(addCardPopup);
});
