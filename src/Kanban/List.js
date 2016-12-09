import React, { Component, PropTypes } from 'react';
import { Col, Panel } from 'react-bootstrap';
import Card from './Card'

class List extends Component {
  static propTypes = {
    id: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title } = this.props;

    return (
      <Col xs={6} md={4}>
        <Panel header={ title }>
          <Card text="This is a card example" />
        </Panel>
      </Col>
    );
  }
}

export default List;
