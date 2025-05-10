export function openModal(modal) {
  modal.classList.add('popup_is-opened');

  document.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape') {
        closeModal(modal);
      }
    },
    { once: true }
  );
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
}

const modals = document.querySelectorAll('.popup');

modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
      closeModal(modal);
    }
  });
});
