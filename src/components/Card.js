import React, { Component, PropTypes } from 'react'
import { Button, ButtonToolbar, ButtonGroup, Glyphicon } from "react-bootstrap"
import { Panel } from "react-bootstrap"
import { DragSource, DropTarget } from "react-dnd"
import ItemTypes from "../constants/ItemTypes"
import CardTextInput from './CardTextInput'
import './Card.css'
import flow from 'lodash/flow'

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
  beginDrag(props) {
    return {
      id: props.card.id,
      originalIndex: props.findCard(props.card.id).index
    }
  },

  endDrag(props, monitor) {
    const {id: droppedId, originalIndex} = monitor.getItem()
    const didDrop = monitor.didDrop()

    if (!didDrop) {
      props.moveCard(droppedId, originalIndex)
    }
  }
}

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const cardTarget = {
  canDrop() {
    return false
  },

  hover(props, monitor) {
    const {id: draggedId} = monitor.getItem()
    const {id: overId} = props.card

    if (draggedId !== overId) {
      props.moveCard(draggedId, overId)
    }
  }
}

/**
 * Specifies which props to inject into your component.
 */
function collectDrag(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
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
    // You can ask the monitor about the current drag state:
    hovered: monitor.isOver()
  }
}

class Card extends Component {
  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteCard(id)
    } else {
      this.props.editCard(id, text)
    }
    this.setState({ editing: false })
  }

  render() {
    const { card, deleteCard } = this.props
    const { isDragging, connectDragSource, connectDropTarget } = this.props
    const opacity = isDragging ? 0 : 1

    let element
    if (this.state.editing) {
      element = (
        <CardTextInput text={card.name}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(card.id, text)} />
      )
    } else {
      element = (
        <div>
          <span onDoubleClick={this.handleDoubleClick}>
            {card.name}
          </span>
          <ButtonToolbar className="card-btn-toolbar">
            <ButtonGroup>
              <Button bsSize="xsmall" onClick={() => deleteCard(card.id)}>
                <Glyphicon glyph="remove" />
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      )
    }

    return connectDragSource(connectDropTarget(
      <div>
        <Panel className="card-container" style={{opacity}}>
          {element}
        </Panel>
      </div>
    ))
  }
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  editCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
  findCard: PropTypes.func.isRequired,
  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  hovered: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired
}

export default flow(
  DragSource(ItemTypes.CARD, cardSource, collectDrag),
  DropTarget(ItemTypes.CARD, cardTarget, collectDrop)
)(Card)
