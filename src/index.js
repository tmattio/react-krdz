import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import { getAllLists, getAllCards } from './actions';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(getAllLists('F4sP3vRt'));
store.dispatch(getAllCards('F4sP3vRt'));

render(
  <Root store={store} history={history} />, document.getElementById('root')
);
