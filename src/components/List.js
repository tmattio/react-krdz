import React, { PropTypes, Component } from 'react'
import { Panel } from "react-bootstrap"
import Card from './Card'

class List extends Component {
  render() {
    const { list, cards, actions } = this.props

    return (
      <div>
        <Panel header={list.name}>
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
  list: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

export default List
