const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-38',
  headers: {
    authorization: '7ec4ef4b-01f1-46d3-9ab5-eed9e2b11fd9',
    contentTypeJson: 'application/json',
  },
};

export const getProfileInfo = () => {
  return fetch(config.baseUrl + '/users/me', {
    method: 'GET',
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((response) => {
    if (response.ok && isApplicationJsonResponse(response)) {
      return response.json();
    }

    return errorResponseHandle(response);
  });
};

function isApplicationJsonResponse(response) {
  return response.headers.get('content-type').includes('application/json');
}

function errorResponseHandle(response) {
  if (isApplicationJsonResponse(response)) {
    return response.json().then((err) => {
      return Promise.reject(`Код ${response.status}, ${err.message}`);
    });
  }

  return Promise.reject(`Код: ${res.status}. При выполнении запроса: ${res.url} возникла непредвиденная ошибка`);
}

export const getInitialCards = () => {
  return fetch(config.baseUrl + '/cards', {
    method: 'GET',
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((response) => {
    if (response.ok && isApplicationJsonResponse(response)) {
      return response.json();
    }

    return errorResponseHandle(response);
  });
};

export const updateProfile = (jsonData) => {
  return fetch(config.baseUrl + '/users/me', {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers.contentTypeJson,
    },
    body: JSON.stringify(jsonData),
  }).then((response) => {
    if (response.ok && isApplicationJsonResponse(response)) {
      return response.json();
    }

    return errorResponseHandle(response);
  });
};
