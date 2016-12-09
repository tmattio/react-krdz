import React, { Component } from 'react';
import { Row, Grid } from 'react-bootstrap';
import List from './List'

class Board extends Component {
  render() {
    return (
      <Grid fluid={true}>
        <Row className="show-grid">
          <List title="To Do" />
          <List title="In Progress" />
          <List title="Done" />
        </Row>
      </Grid>
    );
  }
}

export default Board;
