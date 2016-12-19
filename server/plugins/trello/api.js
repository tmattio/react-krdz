require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import url from 'url';

class Trello {
  constructor(key, token) {
    this.uri = 'https://api.trello.com';
    this.key = key;
    this.token = token;
  }

  sendQuery(uri, method, data) {
    let query = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    /* global URL url:true */
    const urlObject = url.parse(uri, true, false);

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
      Object.keys(params).forEach(key => urlObject.query[key] = params[key]);
    }

    return fetch(url.format(urlObject), query).then(response => response.json());
  }

  addCard(card) {
    return this.sendQuery('https://api.trello.com/1/cards/', 'POST', card);
  }

  deleteCard(cardId) {
    return this.sendQuery(`https://api.trello.com/1/cards/${cardId}`, 'DELETE', null);
  }

  updateCard(cardId, data) {
    return this.sendQuery(`https://api.trello.com/1/cards/${cardId}`, 'PUT', data);
  }

  getListCards(listId) {
    return this.sendQuery(`https://api.trello.com/1/lists/${listId}/cards`, 'GET', null);
  }

  getBoardLists(boardId) {
    return this.sendQuery(`https://api.trello.com/1/boards/${boardId}/lists`, 'GET', null);
  }

  getBoardCards(boardId) {
    return this.sendQuery(`https://api.trello.com/1/boards/${boardId}/cards`, 'GET', null);
  }

  addList(boardId, data) {
    return this.sendQuery(`https://api.trello.com/1/${boardId}/lists`, 'POST', data);
  }

  updateList(listId, data) {
    return this.sendQuery(`https://api.trello.com/1/lists/${listId}`, 'PUT', data);
  }
}

export default new Trello(
  '0b951904f64fad0e32161b028b58ab2c', // key
  'd93a01d636ce24d5ae3563b2bf60d83022da25b390e7080ab899a666a9da9a00', // token
);
