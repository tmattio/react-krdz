import React, { PropTypes, Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import './Footer.css';

class Footer extends Component {
  renderCardCount() {
    const { cards } = this.props;

    const completedCount = cards.reduce(
      (count, card) => {
        if (card.completed) {
          return count + 1;
        }
        return count;
      },
      0,
    );
    const activeCount = cards.length - completedCount;
    const itemWord = activeCount === 1
      ? 'item'
      : 'items';

    return (
      <span className="card-count">
        <strong>{activeCount || 'No'}</strong>
        {itemWord}
        left
      </span>
    );
  }

  render() {
    return (
      <footer className="Footer">
        <Grid fluid>
          <Row className="show-grid">
            <Col md={4} />
            <Col md={4} />
            <Col md={4}>
              <p className="text-right">{this.renderCardCount()}</p>
            </Col>
          </Row>
        </Grid>
      </footer>
    );
  }
}

Footer.propTypes = {
  cards: PropTypes.arrayOf(React.PropTypes.shape({
    id: PropTypes.string.isRequired,
    listId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default Footer;
