class Auth {
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

  signUpUser(inputValues) {
    console.log(inputValues);
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "password": inputValues.password,
        "email": inputValues.email
      })
    })
    .then(this._checkExecution)
  }

  signInUser(inputValues) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "password": inputValues.password,
        "email": inputValues.email
      })
    })
    .then(this._checkExecution);
  }

  checkToken(JWT) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Authorization" : `Bearer ${JWT}`,
        ...this._headers,
      }
    })
    .then(this._checkExecution);
  }
}

const auth = new Auth({
  baseUrl: 'https://api.mesto.tovchennikov.nomoredomains.work',
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
  // baseUrl:' http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default auth
