import React, { Component, PropTypes } from "react";
import { Row, Grid, Col } from "react-bootstrap"
import List from "./List";
import { trelloClient } from "../api/trello";

class KanbanBoard extends Component {
  constructor(props) {
    super(props)

    var listsPromise = trelloClient.getListsOnBoard(this.props.id)
    listsPromise.then((lists) => {
      lists.map((list, i) => {
        var addedList = this.props.actions.addList(list.id, list.name)

        var cardsPromise = trelloClient.getCardsForList(list.id)
        cardsPromise.then((cards) => {
          cards.map((card, i) => {
            return (
              this.props.actions.addCard(card.name, card.id, list.id)
            )
          })
        })
        return addedList
      })
    })
  }

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
  id: PropTypes.any.isRequired,
  cards: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

export default KanbanBoard
