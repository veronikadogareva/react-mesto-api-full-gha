class Api {
  constructor(dataApi) {
    // this._authorization = dataApi.headers.authorization;
    this._baseUrl = dataApi.baseUrl;
    // this._headers = dataApi.headers;
  }
  
  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  _request(url, options) {
    return fetch(`${this._baseUrl}/${url}`, options).then(this._checkResult)
  }
  getInitialCards() {
    const token = localStorage.getItem('token');
    return this._request('cards', {
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  getUserInfo() {
    const token = localStorage.getItem('token');
    return this._request('users/me', {
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  patchUserInfo(data) {
    const token = localStorage.getItem('token');
    return this._request('users/me', {
      method: 'PATCH',
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }
  patchUserAvatar(avatar) {
    const token = localStorage.getItem('token');
    return this._request('users/me/avatar', {
      method: 'PATCH',
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      })
    });
  }
  postNewCard(data) {
    const token = localStorage.getItem('token');
    return this._request('cards', {
      method: 'POST',
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.title,
        link: data.link
      })
    });
  }
  deleteCard(cardId) {
    const token = localStorage.getItem('token');
    return this._request(`cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  likeCard(cardId) {
    const token = localStorage.getItem('token');
    return this._request(`cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  dislikeCard(cardId) {
    const token = localStorage.getItem('token');
    return this._request(`cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
}
const api = new Api({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64/',
  baseUrl: 'https://veronika.theplace.nomoreparties.co/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    'Content-Type': 'application/json'
  }
}); 

export { api };