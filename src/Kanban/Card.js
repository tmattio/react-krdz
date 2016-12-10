import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import { trelloClient } from '../trello'

class Card extends Component {
  static propTypes = {
    id: PropTypes.any.isRequired,
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

    return (
      <Panel>
        {name}
      </Panel>
    );
  }
}

export default Card;
