import { ADD_CARD, DELETE_CARD, EDIT_CARD, COMPLETE_CARD } from '../constants/ActionTypes'

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]

export default function cards(state = initialState, action) {
  switch (action.type) {
    case ADD_CARD:
      return [
        {
          id: state.reduce((maxId, card) => Math.max(card.id, maxId), -1) + 1,
          completed: false,
          text: action.text
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

    default:
      return state
  }
}
