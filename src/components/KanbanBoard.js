import React, { Component, PropTypes } from "react";
import { Row, Grid, Col } from "react-bootstrap"
import List from "./List";

class KanbanBoard extends Component {
  render() {
    const {lists, cards, actions} = this.props;

    return (
      <div>
        <Grid fluid={true}>
          <Row className="show-grid">
            {lists.map((list, i) => {
              const currentListCards = cards.filter((card) => card.listId === list.id)
              return (
                <Col xs={6} md={4}>
                  <List key={list.id} list={list} cards={currentListCards} actions={actions} />
                </Col>
              );
            })}
          </Row>
        </Grid>
      </div>
    );
  }
}

KanbanBoard.propTypes = {
  cards: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

export default KanbanBoard
