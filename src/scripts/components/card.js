export function createCard(data, template, deleteCardCallback, openCardImageCallback, likeCardCallback, currentUserId) {
  const card = template.content.querySelector('.card').cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  cardImage.src = data.link;
  cardImage.name = data.name;
  cardImage.alt = data.name;

  const likeCounter = card.querySelector('.card__like-count');
  likeCounter.textContent = data.likes.length;

  const cardDeleteButton = card.querySelector('.card__delete-button');

  if (data.owner._id === currentUserId) {
    cardDeleteButton.addEventListener('click', () => {
      deleteCardCallback(data._id, card);
    });
  } else {
    cardDeleteButton.remove();
  }

  card.querySelector('.card__title').textContent = data.name;

  const likeButton = card.querySelector('.card__like-button');
  if (isLikedByMe(data.likes, currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click', () => {
    likeCardCallback(data, likeButton, likeCounter);
  });

  cardImage.addEventListener('click', () => {
    openCardImageCallback(data.link, data.name);
  });

  return card;
}

export function isLikedByMe(likes, currentUserId) {
  return likes.some((like) => {
    return like._id === currentUserId;
  });
}
