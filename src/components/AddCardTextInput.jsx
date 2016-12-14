import React, { Component, PropTypes } from 'react';
import {
  FormGroup,
  InputGroup,
  FormControl,
  Button,
  Glyphicon,
} from 'react-bootstrap';
import './AddCardTextInput.css';

class AddCardTextInput extends Component {
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      text: this.props.text || '',
      focused: false,
    };
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur() {
    this.setState({ focused: false });
  }

  handleSubmit(e) {
    const text = e.target.value.trim();
    if (e.which === 13) {
      if (text.length !== 0) {
        this.props.addCard(text);
      }
      this.setState({ text: '' });
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    const { focused } = this.state;

    return (
      <div>
        <FormGroup>
          <InputGroup
            className={focused && 'focus'}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          >
            <FormControl
              type="text"
              placeholder="Add a new task"
              value={this.state.text}
              onChange={this.handleChange}
              onKeyDown={this.handleSubmit}
            />
            <InputGroup.Button>
              <Button>
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
  addCard: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export default AddCardTextInput;
