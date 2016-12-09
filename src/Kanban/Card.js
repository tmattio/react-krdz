import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';

class Card extends Component {
  static propTypes = {
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
  };

  render() {
    const { text } = this.props;

    return (
      <Panel>
        { text }
      </Panel>
    );
  }
}

export default Card;
