export function createCard(data, template, deleteCardCallback, openCardImageCallback, likeCardCallback) {
  const card = template.content.querySelector('.card').cloneNode(true);

  console.log(data);

  const cardImage = card.querySelector('.card__image');
  cardImage.src = data.link;
  cardImage.name = data.name;
  cardImage.alt = data.name;

  card.querySelector('.card__like-count').textContent = data.likes.length;

  card.querySelector('.card__delete-button').addEventListener('click', () => {
    deleteCardCallback(card);
  });
  card.querySelector('.card__title').textContent = data.name;

  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => {
    likeCardCallback(likeButton);
  });

  cardImage.addEventListener('click', () => {
    openCardImageCallback(data.link, data.name);
  });

  return card;
}

export function deleteCard(card) {
  card.remove();
}

export function likeCard(button) {
  button.classList.toggle('card__like-button_is-active');
}
