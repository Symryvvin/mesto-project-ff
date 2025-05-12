export function openModal(modal) {
  modal.classList.add('popup_is-opened');

  document.addEventListener('keydown', closeModalEsc);
}

function closeModalEsc(e) {
  if (e.key === 'Escape') {
    const modal = document.querySelector('.popup_is-opened');
    closeModal(modal);
  }
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', closeModalEsc);
}
