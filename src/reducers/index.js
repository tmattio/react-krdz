import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import cards from './cards';
import lists from './lists';

const rootReducer = combineReducers({ cards, lists, routing });

export default rootReducer;
