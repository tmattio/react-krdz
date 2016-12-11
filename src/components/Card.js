import React, { Component, PropTypes } from 'react'
import { Button, ButtonToolbar, ButtonGroup, Glyphicon } from "react-bootstrap";
import { Panel } from "react-bootstrap"
import CardTextInput from './CardTextInput'
import './Card.css'

class Card extends Component {
  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteCard(id)
    } else {
      this.props.editCard(id, text)
    }
    this.setState({ editing: false })
  }

  render() {
    const { card, completeCard, deleteCard } = this.props

    let element
    if (this.state.editing) {
      element = (
        <CardTextInput text={card.name}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(card.id, text)} />
      )
    } else {
      element = (
        <div>
          <span onDoubleClick={this.handleDoubleClick}>
            {card.name}
          </span>
          <ButtonToolbar className="card-btn-toolbar">
            <ButtonGroup>
              <Button bsSize="xsmall">
                <Glyphicon glyph="ok" onClick={() => completeCard(card.id)} />
              </Button>
              {' '}
              <Button bsSize="xsmall" onClick={() => deleteCard(card.id)}>
                <Glyphicon glyph="remove" />
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      )
    }

    return (
      <Panel  className="card-container">
        {element}
      </Panel>
    )
  }
}


Card.propTypes = {
  card: PropTypes.object.isRequired,
  editCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  completeCard: PropTypes.func.isRequired
}

export default Card
