import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import * as ActionTypes from '../constants/ActionTypes';
import cards from './cards';
import lists from './lists';

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

const rootReducer = combineReducers({ cards, lists, routing })

export default rootReducer
