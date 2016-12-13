import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import App from './containers/App'
import reducer from './reducers'
import configureStore from './store/configureStore'
import { getAllLists, getAllCards } from './actions'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

store.dispatch(getAllLists('F4sP3vRt'))
store.dispatch(getAllCards('F4sP3vRt'))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
