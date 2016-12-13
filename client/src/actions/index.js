import * as ActionTypes from '../constants/ActionTypes'
import trello from '../api/trello'

export const receiveAddCard = (name, id, listId) => ({type: ActionTypes.ADD_CARD, id, name, listId})
export const addCard = (name, listId = "584b1250b2aa721a50879258") => dispatch => {
  const newCard = {
    name: name,
    idList: listId,
    desc: ''
  }
  trello.addCard(newCard, card => {
    dispatch(receiveAddCard(card.name, card.id, card.idList))
  })
}

export const receiveDeleteCard = id => ({type: ActionTypes.DELETE_CARD, id})
export const deleteCard = id => dispatch => {
  trello.deleteCard(id, response => {
    dispatch(receiveDeleteCard(id))
  })
}

export const receiveEditCard = (id, name, listId) => ({type: ActionTypes.EDIT_CARD, id, name, listId})
export const editCard = (id, name = null, listId = null) => dispatch => {
  var data = {
    name: name,
    idList: listId
  }
  if (name) {
    data = {
      ...data,
      name: name
    }
  }
  if (listId) {
    data = {
      ...data,
      idList: listId
    }
  }

  trello.updateCard(id, data, card => {
    dispatch(receiveEditCard(card.id, card.name, card.idList))
  })
}

export const moveCard = (draggedId, targetId) => ({type: ActionTypes.MOVE_CARD, draggedId, targetId})
export const changeCardList = (cardId, listId) => ({type: ActionTypes.CHANGE_CARD_LIST, cardId, listId})

export const receiveChangeCardList = (cardId, listId) => ({type: ActionTypes.CHANGE_CARD_LIST, cardId, listId})

export const receiveAddList = (name, id) => ({type: ActionTypes.ADD_LIST, id, name})
export const receiveDeleteList = id => ({type: ActionTypes.DELETE_LIST, id})

export const getAllCards = boardId => dispatch => {
  trello.getBoardLists(boardId, lists => {
    lists.forEach(list => {
      trello.getListCards(list.id, cards => cards.forEach(card => {
        dispatch(receiveAddCard(card.name, card.id, list.id))
      }))
    })
  })
}

export const getAllLists = boardId => dispatch => {
  trello.getBoardLists(boardId, lists => lists.forEach(list => dispatch(receiveAddList(list.name, list.id))))
}

// Resets the currently visible error message.
export const resetErrorMessage = () => ({type: ActionTypes.RESET_ERROR_MESSAGE})
