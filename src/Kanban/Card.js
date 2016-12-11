import React, { Component, PropTypes } from "react";
import { Panel } from "react-bootstrap";
import { DragSource, DropTarget } from "react-dnd";
import ItemTypes from "./ItemTypes";
import { trelloClient } from "../trello";
import flow from 'lodash/flow';

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findCard(props.id).index
    };
  },

  endDrag(props, monitor) {
    const {id: droppedId, originalIndex} = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveCard(droppedId, originalIndex);
    }
  }
};

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const cardTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const {id: draggedId} = monitor.getItem();
    const {id: overId} = props;

    if (draggedId !== overId) {
      const {index: overIndex} = props.findCard(overId);
      props.moveCard(draggedId, overIndex);
    }
  }
};

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
  };
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
  };
}

const propTypes = {
  id: PropTypes.any.isRequired,
  moveCard: PropTypes.func.isRequired,
  findCard: PropTypes.func.isRequired,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  hovered: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired
};

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ""};

    var cardPromise = trelloClient.getCard(this.props.id);
    cardPromise.then((card) => {
      this.setState({name: card.name});
    });
  }

  render() {
    const {name} = this.state;
    const {isDragging, connectDragSource, connectDropTarget} = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div>
        <Panel style={{opacity}}>
          {name}
        </Panel>
      </div>
    ));
  }
}

Card.propTypes = propTypes;

export default flow(
  DragSource(ItemTypes.CARD, cardSource, collectDrag),
  DropTarget(ItemTypes.CARD, cardTarget, collectDrop)
)(Card);
