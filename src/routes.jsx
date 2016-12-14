import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import About from './containers/About';
import NotFound from './containers/NotFound';
import KanbanBoard from './containers/KanbanBoard';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={KanbanBoard} />
    <Route path="/about" component={About} />
    <Route path="*" component={NotFound} />
  </Route>
);
