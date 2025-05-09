export function openPopup(popup) {
  popup.classList.add('popup_is-opened');

  document.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape') {
        closePopup(popup);
      }
    },
    { once: true }
  );
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
});
