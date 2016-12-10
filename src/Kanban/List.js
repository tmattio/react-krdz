import React, { Component, PropTypes } from 'react';
import { Col, Panel } from 'react-bootstrap';
import Card from './Card'
import { trelloClient } from '../trello'

class List extends Component {
  static propTypes = {
    id: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { cards: [], title: "" };

    var cardsPromise = trelloClient.getCardsForList(this.props.id)
    cardsPromise.then((cards) => {
      this.setState({ cards: cards });
    })

    var listPromise = trelloClient.getList(this.props.id)
    listPromise.then((list) => {
      this.setState({ title: list.name });
    })
  }

  render() {
    const { cards, title } = this.state;

    return (
      <Col xs={6} md={4}>
        <Panel header={ title }>
          {cards.map((card, i) => {
            return (
              <Card key={card.id} id={card.id} />
            );
          })}
        </Panel>
      </Col>
    );
  }
}

export default List;
