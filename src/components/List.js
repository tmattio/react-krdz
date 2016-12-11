import React, { PropTypes, Component } from 'react'
import { Panel } from "react-bootstrap"
import Card from './Card'

class List extends Component {
  render() {
    const { cards, actions } = this.props

    return (
      <div>
        <Panel header="Header">
          <section className="main">
            {cards.map(card =>
              <Card key={card.id} card={card} {...actions} />
            )}
          </section>
        </Panel>
      </div>
    )
  }
}

List.propTypes = {
  cards: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  addCard: PropTypes.func.isRequired
}

export default List
