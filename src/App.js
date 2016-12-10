import React, { Component } from 'react';
import Board from './Kanban/Board'
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board id={'F4sP3vRt'} />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
