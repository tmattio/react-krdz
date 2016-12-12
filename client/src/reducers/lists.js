import { ADD_LIST, DELETE_LIST } from '../constants/ActionTypes'

const initialState = []

export default function lists(state = initialState, action) {
  switch (action.type) {
    case ADD_LIST:
      return [
        ...state,
        {
          id: action.id,
          name: action.name
        }
      ]

    case DELETE_LIST:
      return state.filter(list =>
        list.id !== action.id
      )

    default:
      return state
  }
}
