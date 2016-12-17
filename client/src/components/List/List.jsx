import React, { PropTypes, Component } from 'react';
import { Panel } from 'react-bootstrap';
import { DropTarget } from 'react-dnd';
import Card from '../Card';
import ItemTypes from '../../constants/ItemTypes';

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const cardTarget = {
  drop(props, monitor) {
    const { id } = monitor.getItem();
    props.actions.editCard(id, null, props.id);
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const draggedCard = props.findCard(draggedId);

    if (draggedCard.listId !== props.id) {
      props.actions.changeCardList(draggedCard.id, props.id);
    }
  },
};

/**
 * Specifies which props to inject into your component.
 */
function collectDrop(connect) {
  return {
    // Call this function inside render() to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
  };
}

class List extends Component {
  render() {
    const { connectDropTarget } = this.props;
    const { id, name, cards, actions, findCard } = this.props;

    return connectDropTarget(
      <div>
        <Panel header={name} id={id}>
          <section className="main">
            {cards.map(card =>
              <Card
                key={card.id}
                findCard={findCard}
                {...card}
                {...actions}
              />)
            }
          </section>
        </Panel>
      </div>,
    );
  }
}

List.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(React.PropTypes.shape({
    id: PropTypes.string.isRequired,
    listId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  /* eslint react/forbid-prop-types: [2, {"forbid": [array, any]}] */
  actions: PropTypes.object.isRequired,
  findCard: PropTypes.func.isRequired,
  // Injected by React DnD:
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget(ItemTypes.CARD, cardTarget, collectDrop)(List);
