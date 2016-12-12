import React, { Component, PropTypes } from "react"
import { Row, Grid, Col } from "react-bootstrap"
import { DragDropContext } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"
import List from "./List"

class KanbanBoard extends Component {
  constructor(props) {
    super(props)
    this.findCard = this.findCard.bind(this)
  }

  findCard(id) {
    const { cards } = this.props
    const card = cards.filter(c => c.id === id)[0]

    return {
      card,
      index: cards.indexOf(card)
    }
  }

  render() {
    const {lists, cards, actions} = this.props

    return (
      <div>
        <Grid fluid={true}>
          <Row className="show-grid">
            {lists.map(list => {
              const currentListCards = cards.filter((card) => card.listId === list.id)
              return (
                <Col xs={6} md={4}>
                  <List key={list.id} list={list} cards={currentListCards} actions={actions} findCard={this.findCard} />
                </Col>
                )}
            )}
          </Row>
        </Grid>
      </div>
    )
  }
}

KanbanBoard.propTypes = {
  cards: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

export default DragDropContext(HTML5Backend)(KanbanBoard)
