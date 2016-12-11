import * as types from '../constants/ActionTypes'

export const addCard = text => ({ type: types.ADD_CARD, text })
export const deleteCard = id => ({ type: types.DELETE_CARD, id })
export const editCard = (id, text) => ({ type: types.EDIT_CARD, id, text })
export const completeCard = id => ({ type: types.COMPLETE_CARD, id })
