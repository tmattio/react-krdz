import React, { PropTypes, Component } from 'react'
import { Grid, Col, Row } from "react-bootstrap"
import './Footer.css'

class Footer extends Component {
  renderCardCount() {
    const { cards } = this.props

    const completedCount = cards.reduce((count, card) =>
      card.completed ? count + 1 : count,
      0
    )
    const activeCount = cards.length - completedCount
    const itemWord = activeCount === 1 ? 'item' : 'items'

    return (
      <span className="card-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    )
  }

  render() {
    return (
      <footer className="footer">
        <Grid fluid={true}>
          <Row className="show-grid">
            <Col md={4}>

            </Col>
            <Col md={4}>

            </Col>
            <Col md={4}>
              <p className="text-right">{this.renderCardCount()}</p>
            </Col>
          </Row>
        </Grid>
      </footer>
    )
  }
}

Footer.propTypes = {
  cards: PropTypes.array.isRequired
}

export default Footer
