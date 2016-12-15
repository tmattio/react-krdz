import React, { Component, PropTypes } from 'react';
import {
  Button,
  ButtonToolbar,
  ButtonGroup,
  Glyphicon,
  Panel,
} from 'react-bootstrap';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../../constants/ItemTypes';
import CardTextInput from './CardTextInput';
import './Card.css';

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findCard(props.id).index,
      originalList: props.listId,
    };
  },

  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  },
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
      props.moveCard(draggedId, overId);
    }
  },
};

/**
 * Specifies which props to inject into your component.
 */
function collectDrag(connect, monitor) {
  return {
    // Call this function inside render() to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
  };
}

/**
 * Specifies which props to inject into your component.
 */
function collectDrop(connect) {
  return {
    // Call this function inside render() to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
  };
}

class Card extends Component {
  constructor(props) {
    super(props);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.state = {
      editing: false,
    };
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteCard(id);
    } else {
      this.props.editCard(id, text, this.props.listId);
    }
    this.setState({ editing: false });
  }

  render() {
    const { id, name, deleteCard } = this.props;
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    let element;
    if (this.state.editing) {
      element = (
        <div>
          <CardTextInput
            text={name}
            editing={this.state.editing}
            onSave={text => this.handleSave(id, text)}
          />
        </div>
      );
    } else {
      element = (
        <div>
          <span onDoubleClick={this.handleDoubleClick}>
            {name}
          </span>
          <ButtonToolbar className="card-btn-toolbar">
            <ButtonGroup>
              <Button bsSize="xsmall" onClick={() => deleteCard(id)}>
                <Glyphicon glyph="remove" />
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      );
    }

    return connectDragSource(connectDropTarget(
      <div>
        <Panel className="card-container" style={{ opacity }}>
          {element}
        </Panel>
      </div>,
    ));
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  deleteCard: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default DragSource(ItemTypes.CARD, cardSource, collectDrag)(
  DropTarget(ItemTypes.CARD, cardTarget, collectDrop)(Card));
