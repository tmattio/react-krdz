import React, { Component } from "react";
import Board from "./Kanban/Board";
import Header from "./Header";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Board id={'F4sP3vRt'}/>
      </div>
    );
  }
}

export default App;
