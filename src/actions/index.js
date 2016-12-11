import * as types from '../constants/ActionTypes'

export const addCard = (id, name) => ({ type: types.ADD_CARD, id, name })
export const deleteCard = id => ({ type: types.DELETE_CARD, id })
export const editCard = (id, name) => ({ type: types.EDIT_CARD, id, name })
export const completeCard = id => ({ type: types.COMPLETE_CARD, id })
export const moveCardToList = (cardId, listId) => ({ type: types.MOVE_CARD_TO_LIST, cardId, listId })

export const addList = (id, name) => ({ type: types.ADD_LIST, id, name })
export const deleteList= id => ({ type: types.DELETE_LIST, id })
