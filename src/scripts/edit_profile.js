import * as popup from './popup.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');

profileEditButton.addEventListener('click', (e) => {
  const formElement = document.querySelector('.popup__form[name=edit-profile');

  const nameInput = profileEditPopup.querySelector('.popup__input_type_name');
  const jobInput = profileEditPopup.querySelector('.popup__input_type_description');

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

  popup.openPopup(profileEditPopup);
});
