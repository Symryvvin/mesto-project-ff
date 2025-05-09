import * as all from './popup.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');

profileEditButton.addEventListener('click', (e) => {
  all.openPopup(profileEditPopup);
});
