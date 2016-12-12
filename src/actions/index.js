import * as types from '../constants/ActionTypes'
import uuid from 'uuid/v4'
import { trelloClient } from '../api/trello'

export const addCard = (name, id = uuid(), listId = "584b1250b2aa721a50879258") => ({ type: types.ADD_CARD, id, name, listId })
export const deleteCard = id => ({ type: types.DELETE_CARD, id })
export const editCard = (id, name) => ({ type: types.EDIT_CARD, id, name })
export const moveCard = (draggedId, targetId) => ({ type: types.MOVE_CARD, draggedId, targetId })
export const moveCardToList = (cardId, listId) => ({ type: types.MOVE_CARD_TO_LIST, cardId, listId })

export const addList = (name, id = uuid()) => ({ type: types.ADD_LIST, id, name })
export const deleteList= id => ({ type: types.DELETE_LIST, id })

export const getAllCards = (boardId) => dispatch => {
  var listsPromise = trelloClient.getListsOnBoard(boardId)
  listsPromise.then((lists) => {
    lists.map((list, i) => {
      var cardsPromise = trelloClient.getCardsForList(list.id)
      return (
        cardsPromise.then((cards) => {
          cards.map((card, i) => dispatch(addCard(card.name, card.id, list.id)))
        })
      )
    })
  })
}

export const getAllLists = (boardId) => dispatch => {
  var listsPromise = trelloClient.getListsOnBoard(boardId)
  listsPromise.then((lists) =>
    lists.map((list, i) =>
      dispatch(addList(list.name, list.id))
    )
  )
}
