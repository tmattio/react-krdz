import React, { Component, PropTypes } from "react";
import { FormGroup, InputGroup, FormControl, Button, Glyphicon } from "react-bootstrap";

class AddCardTextInput extends Component {
  state = {
    text: this.props.text || ''
  }

  handleSubmit = e => {
    const text = e.target.value.trim()
    if (e.which === 13) {
      if (text.length !== 0) {
        this.props.addTask(text)
      }
      this.setState({ text: '' })
    }
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  render() {
    return (
      <div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Add a new task"
              autoFocus="true"
              value={this.state.text}
              onChange={this.handleChange}
              onKeyDown={this.handleSubmit} />
            <InputGroup.Button>
              <Button type="submit">
                <Glyphicon glyph="plus" />
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </div>
    );
  }
}

AddCardTextInput.propTypes = {
  addTask: PropTypes.func.isRequired
}

export default AddCardTextInput
