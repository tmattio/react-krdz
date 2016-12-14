import fetch from 'isomorphic-fetch';

class Trello {
  constructor(key, token) {
    this.uri = 'https://api.trello.com';
    this.key = key;
    this.token = token;
  }

  sendQuery(uri, method, data, callback) {
    let query = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const url = new URL(uri);

    if (method !== 'GET') {
      let reqBody = {
        key: this.key,
        token: this.token,
      };
      if (data) {
        reqBody = {
          ...reqBody,
          ...data,
        };
      }
      const dataString = JSON.stringify(reqBody);
      query = {
        ...query,
        body: dataString,
      };
    } else {
      const params = {
        key: this.key,
        token: this.token,
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }

    return fetch(url, query).then(response => response.json()).then(
      responseJson => callback(responseJson),
    );
  }

  addCard(card, callback) {
    this.sendQuery('https://api.trello.com/1/cards/', 'POST', card, callback);
  }

  deleteCard(cardId, callback) {
    this.sendQuery(`https://api.trello.com/1/cards/${cardId}`, 'DELETE', null, callback);
  }

  updateCard(cardId, data, callback) {
    this.sendQuery(`https://api.trello.com/1/cards/${cardId}`, 'PUT', data, callback);
  }

  getBoardLists(boardId, callback) {
    this.sendQuery(`https://api.trello.com/1/boards/${boardId}/lists`, 'GET', null, callback);
  }

  getListCards(listId, callback) {
    this.sendQuery(`https://api.trello.com/1/lists/${listId}/cards`, 'GET', null, callback);
  }
}

export default new Trello(
  '0b951904f64fad0e32161b028b58ab2c', // key
  'd93a01d636ce24d5ae3563b2bf60d83022da25b390e7080ab899a666a9da9a00', // token
);
