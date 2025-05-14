const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-38',
  headers: {
    authorization: '7ec4ef4b-01f1-46d3-9ab5-eed9e2b11fd9',
    contentTypeJson: 'application/json',
  },
};

export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleApiResponse);
};

function handleApiResponse(response) {
  if (response.ok && isApplicationJsonResponse(response)) {
    return response.json();
  }

  return errorResponseHandle(response);
}

function isApplicationJsonResponse(response) {
  return response.headers.get('content-type').includes('application/json');
}

function errorResponseHandle(response) {
  if (isApplicationJsonResponse(response)) {
    return response.json().then((err) => {
      return Promise.reject({
        code: response.status,
        message: err.message === null ? 'Непредвиденная ошибка' : err.message,
      });
    });
  }

  return Promise.reject({
    code: response.status,
    message: `При выполнении запроса: ${res.url} возникла непредвиденная ошибка`,
  });
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleApiResponse);
};

export const updateProfile = (profileName, profileDescription) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers.contentTypeJson,
    },
    body: JSON.stringify({
      name: profileName,
      about: profileDescription,
    }),
  }).then(handleApiResponse);
};

export const addNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers.contentTypeJson,
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then(handleApiResponse);
};

export const deleteCardById = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleApiResponse);
};

export const likeCardById = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleApiResponse);
};

export const unlikeCardById = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleApiResponse);
};

export const updateProfileAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers.contentTypeJson,
    },
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then(handleApiResponse);
};
