import * as types from '../constants/ActionTypes'
import trello from '../api/trello'

export const receiveAddCard = (name, id, listId) => ({
  type: types.ADD_CARD, id, name, listId
})
export const addCard = (name, listId = "584b1250b2aa721a50879258") => dispatch => {
  const newCard = {name: name, idList: listId, desc: ''}
  trello.addCard(newCard, card => {
    dispatch(receiveAddCard(card.name, card.id, card.idList))
  })
}

export const receiveDeleteCard = id => ({ type: types.DELETE_CARD, id })
export const deleteCard = id => dispatch => {
  trello.deleteCard(id, response => {
    dispatch(receiveDeleteCard(id))
  })
}

export const receiveEditCard = (id, name, listId) => ({ type: types.EDIT_CARD, id, name, listId })
export const editCard = (id, name, listId) => dispatch => {
  const data = {name: name, idList: listId}
  trello.updateCard(id, data, card => {
    dispatch(receiveEditCard(card.id, card.name, card.idList))
  })
}

export const moveCard = (draggedId, targetId) => ({ type: types.MOVE_CARD, draggedId, targetId })
export const changeCardList = (cardId, listId) => ({ type: types.CHANGE_CARD_LIST, cardId, listId })

export const receiveChangeCardList = (cardId, listId) => ({ type: types.CHANGE_CARD_LIST, cardId, listId })

export const receiveAddList = (name, id) => ({ type: types.ADD_LIST, id, name })
export const receiveDeleteList= id => ({ type: types.DELETE_LIST, id })

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
  trello.getBoardLists(boardId, lists =>
    lists.forEach(list => dispatch(receiveAddList(list.name, list.id))
  ))
}
