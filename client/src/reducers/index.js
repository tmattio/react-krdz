import { combineReducers } from 'redux'
import cards from './cards'
import lists from './lists'

const rootReducer = combineReducers({
  cards,
  lists
})

export default rootReducer
