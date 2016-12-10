import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { trelloClient } from '../trello'

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
     const { id: droppedId, originalIndex } = monitor.getItem();
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
     const { id: draggedId } = monitor.getItem();
     const { id: overId } = props;

     if (draggedId !== overId) {
       const { index: overIndex } = props.findCard(overId);
       props.moveCard(draggedId, overIndex);
     }
   }
 };

class Card extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    moveCard: PropTypes.func.isRequired,
    findCard: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { name: "" };

    var cardPromise = trelloClient.getCard(this.props.id)
    cardPromise.then((card) => {
      this.setState({ name: card.name });
    })
  }

  render() {
    const { name } = this.state;
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div>
        <Panel style={{ opacity }}>
          {name}
        </Panel>
      </div>
    ));
  }
}

export default DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(
  DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(
    Card
  )
);
