import React, { Component, PropTypes } from "react"
import { FormGroup, InputGroup, FormControl, Button, Glyphicon } from "react-bootstrap"
import './AddCardTextInput.css'

class AddCardTextInput extends Component {
  state = {
    text: this.props.text || '',
    focused: false
  }

  onFocus = e => {
    this.setState({
      focused: true
    })
  }

  onBlur = e => {
    this.setState({
      focused: false
    })
  }

  handleSubmit = e => {
    const text = e.target.value.trim()
    if (e.which === 13) {
      if (text.length !== 0) {
        this.props.addCard(text)
      }
      this.setState({ text: '' })
    }
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  render() {
    const {focused} = this.state

    return (
      <div>
        <FormGroup>
          <InputGroup
            className={focused && 'focus'}
            onFocus={this.onFocus}
            onBlur={this.onBlur} >
            <FormControl
              type="text"
              placeholder="Add a new task"
              value={this.state.text}
              onChange={this.handleChange}
              onKeyDown={this.handleSubmit} />
            <InputGroup.Button>
              <Button>
                <Glyphicon glyph="plus" />
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </div>
    )
  }
}

AddCardTextInput.propTypes = {
  addCard: PropTypes.func.isRequired
}

export default AddCardTextInput
