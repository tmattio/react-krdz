import React, { Component, PropTypes } from 'react';
import { Row, Grid } from 'react-bootstrap';
import List from './List'
import { trelloClient } from '../trello'

class Board extends Component {
  static propTypes = {
    id: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { lists: [] };

    var listsPromise = trelloClient.getListsOnBoard(this.props.id)
    listsPromise.then((lists) => {
      this.setState({ lists: lists });
    })
  }

  render() {
    const { lists } = this.state;

    return (
      <Grid fluid={true}>
        <Row className="show-grid">
          {lists.map((list, i) => {
            return (
              <List key={list.id} id={list.id} />
            );
          })}
        </Row>
      </Grid>
    );
  }
}

export default Board;
