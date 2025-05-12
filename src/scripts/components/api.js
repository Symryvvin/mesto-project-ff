const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-38',
  headers: {
    authorization: '7ec4ef4b-01f1-46d3-9ab5-eed9e2b11fd9',
    'Content-Type': 'application/json',
  },
};

export const getProfileInfo = () => {
  return fetch(config.baseUrl + '/users/me', {
    method: 'GET',
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Код: ${res.status}. При получении данных пользователя по url: ${res.url} возникла ошибка`);
  });
};

export const getInitialCards = () => {
  return fetch(config.baseUrl + '/cards', {
    method: 'GET',
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Код: ${res.status}. При получении карточек по url: ${res.url} возникла ошибка`);
  });
};
