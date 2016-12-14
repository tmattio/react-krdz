var Trello = function (key, token) {
  this.uri = "https://api.trello.com";
  this.key = key;
  this.token = token;
}

Trello.prototype.sendQuery = function (uri, method, data, callback) {
  var query = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  var url = new URL(uri)

  if (method !== 'GET') {
    var reqBody = {
      key: this.key,
      token: this.token
    }
    if (data) {
      reqBody = {
        ...reqBody,
        ...data
      }
    }
    const dataString = JSON.stringify(reqBody)
    query = {
      ...query,
      body: dataString
    }
  } else {
    const params = {
      key: this.key,
      token: this.token
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  }

  return fetch(url, query).then((response) => response.json()).then((responseJson) => {
    return callback(responseJson)
  })
}

Trello.prototype.addCard = function (card, callback) {
  return this.sendQuery('https://api.trello.com/1/cards/', 'POST', card, callback)
}

Trello.prototype.deleteCard = function (cardId, callback) {
  return this.sendQuery('https://api.trello.com/1/cards/' + cardId, 'DELETE', null, callback)
}

Trello.prototype.updateCard = function (cardId, data, callback) {
  return this.sendQuery('https://api.trello.com/1/cards/' + cardId, 'PUT', data, callback)
}

Trello.prototype.getBoardLists = function (boardId, callback) {
  return this.sendQuery('https://api.trello.com/1/boards/' + boardId + '/lists', 'GET', null, callback)
}

Trello.prototype.getListCards = function (listId, callback) {
  return this.sendQuery('https://api.trello.com/1/lists/' + listId + '/cards', 'GET', null, callback)
}

export default new Trello("0b951904f64fad0e32161b028b58ab2c", // key
  "d93a01d636ce24d5ae3563b2bf60d83022da25b390e7080ab899a666a9da9a00" // token
)
