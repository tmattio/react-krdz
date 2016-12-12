import {
  ADD_CARD,
  DELETE_CARD,
  EDIT_CARD,
  MOVE_CARD,
  CHANGE_CARD_LIST } from '../constants/ActionTypes'

const initialState = []

export default function cards(state = initialState, action) {
  switch (action.type) {
    case ADD_CARD:
      return [
        ...state,
        {
          id: action.id,
          listId: action.listId,
          name: action.name
        }
      ]

    case DELETE_CARD:
      return state.filter(card =>
        card.id !== action.id
      )

    case EDIT_CARD:
      return state.map(card =>
        card.id === action.id ?
          { ...card, name: action.name } :
          card
      )

    case MOVE_CARD:
      const draggedCard = state.filter(c => c.id === action.draggedId)[0]
      const draggedIndex = state.indexOf(draggedCard)

      const targetCard = state.filter(c => c.id === action.targetId)[0]
      const targetIndex = state.indexOf(targetCard)

      var cards = state.map(c => c)

      // At draggedId, remove 1 item
      cards.splice(draggedIndex, 1)
      // At targetIndex, remove 0 item and add draggedCard
      cards.splice(targetIndex, 0, draggedCard)
      return cards

    case CHANGE_CARD_LIST:
      return state.map(card =>
        card.id === action.cardId ?
          { ...card, listId: action.listId } :
          card
      )

    default:
      return state
  }
}
