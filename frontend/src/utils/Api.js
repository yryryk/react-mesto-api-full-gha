class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkExecution(resolve) {
    if (resolve.ok) {
      return resolve.json();
    }
    return Promise.reject(`Ошибка: ${resolve.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(this._checkExecution)
  }

  setUserInfo(inputValues) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.about
      })
    })
    .then(this._checkExecution);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(this._checkExecution)
  }

  setCard(inputValues) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.name,
        link: inputValues.link
      })
    })
    .then(this._checkExecution);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkExecution);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if(isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkExecution);
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(this._checkExecution);
    }
  }

  setUserAvatar(inputValues) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputValues.avatar
      })
    })
    .then(this._checkExecution);
  }

  setToken(JWT) {
    this._headers.authorization = `Bearer ${JWT}`
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.tovchennikov.nomoredomains.work',
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
  // baseUrl:' http://localhost:3001',
  headers: {
    // authorization: 'a77c8be0-2dca-4e0d-816d-247a8a434831',
    'Content-Type': 'application/json'
  }
});

export default api
