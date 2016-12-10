import React, { Component, PropTypes } from "react";
import update from "react/lib/update";
import { Col, Panel } from "react-bootstrap";
import Card from "./Card";
import { DropTarget } from "react-dnd";
import ItemTypes from "./ItemTypes";
import { trelloClient } from "../trello";

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const cardTarget = {
  drop() {
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collectDrop(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
  };
}

class List extends Component {
  static propTypes = {
    id: PropTypes.any.isRequired,
  };

  moveCard(id, atIndex) {
    const {card, index} = this.findCard(id);
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [index, 1],
          [atIndex, 0, card]
        ]
      }
    }));
  }

  findCard(id) {
    const {cards} = this.state;
    const card = cards.filter(c => c.id === id)[0];

    return {
      card,
      index: cards.indexOf(card)
    };
  }

  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.findCard = this.findCard.bind(this);

    this.state = {cards: [], title: ""};

    var cardsPromise = trelloClient.getCardsForList(this.props.id);
    cardsPromise.then((cards) => {
      this.setState({cards: cards});
    })

    var listPromise = trelloClient.getList(this.props.id);
    listPromise.then((list) => {
      this.setState({title: list.name});
    })
  }

  render() {
    const {connectDropTarget} = this.props;
    const {cards, title} = this.state;

    return connectDropTarget(
      <div>
        <Col xs={6} md={4}>
          <Panel header={ title }>
            {cards.map((card, i) => {
              return (
                <Card key={card.id}
                      id={card.id}
                      moveCard={this.moveCard}
                      findCard={this.findCard}/>
              );
            })}
          </Panel>
        </Col>
      </div>
    );
  }
}

export default DropTarget(ItemTypes.CARD, cardTarget, collectDrop)(List);
