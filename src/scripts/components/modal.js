export function openModal(modal) {
  modal.classList.add('popup_is-opened');

  function closeModalEsc(e) {
    console.log('sds');
    if (e.key === 'Escape') {
      closeModal(modal, closeModalEsc);
    }
  }

  document.addEventListener('keydown', closeModalEsc);
}

export function closeModal(modal, closeModalCallback) {
  modal.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', closeModalCallback);
}
