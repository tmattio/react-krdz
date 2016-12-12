import React, { PropTypes, Component } from 'react'
import { Panel } from "react-bootstrap"
import Card from './Card'
import ItemTypes from "../constants/ItemTypes"
import { DropTarget } from "react-dnd"

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const cardTarget = {
  drop() {
  },

  hover(props, monitor) {
    const {id: draggedId} = monitor.getItem()
    const draggedCard = props.findCard(draggedId).card

    if (draggedCard.listId !== props.list.id) {
      props.actions.changeCardList(draggedCard.id, props.list.id)
    }
  }
}

/**
 * Specifies which props to inject into your component.
 */
function collectDrop(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
  }
}

class List extends Component {
  render() {
    const { connectDropTarget } = this.props
    const { list, cards, actions, findCard } = this.props

    return connectDropTarget(
      <div>
        <Panel header={list.name}>
          <section className="main">
            {cards.map(card =>
              <Card key={card.id}
                    card={card}
                    findCard={findCard}
                    {...actions} />
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
  actions: PropTypes.object.isRequired,
  // Injected by React DnD:
  connectDropTarget: PropTypes.func.isRequired
}

export default DropTarget(ItemTypes.CARD, cardTarget, collectDrop)(List)
