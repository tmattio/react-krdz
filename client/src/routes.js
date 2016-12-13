import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import About from './containers/About'
import NotFound from './containers/NotFound'
import Kanban from './containers/Kanban'

export default <Route path="/" component={App}>
  <Route path="/kanban"
         component={Kanban} />
  <Route path="/about"
         component={About} />
  <Route path="*"
         component={NotFound} />
</Route>
