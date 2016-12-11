import { ADD_CARD, DELETE_CARD, EDIT_CARD, COMPLETE_CARD, MOVE_CARD_TO_LIST } from '../constants/ActionTypes'

const initialState = []

export default function cards(state = initialState, action) {
  switch (action.type) {
    case ADD_CARD:
      return [
        {
          id: action.id,
          name: action.name,
          completed: false,
        },
        ...state
      ]

    case DELETE_CARD:
      return state.filter(card =>
        card.id !== action.id
      )

    case EDIT_CARD:
      return state.map(card =>
        card.id === action.id ?
          { ...card, text: action.text } :
          card
      )

    case COMPLETE_CARD:
      return state.map(card =>
        card.id === action.id ?
          { ...card, completed: !card.completed } :
          card
      )

    case MOVE_CARD_TO_LIST:
      return state.map(card =>
        card.id === action.cardId ?
          { ...card, listId: action.listId } :
          card
      )

    default:
      return state
  }
}
