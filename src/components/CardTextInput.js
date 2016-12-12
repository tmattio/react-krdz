import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

export default class CardTextInput extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
  }

  state = {
    text: this.props.text || ''
  }

  handleSubmit = e => {
    const text = e.target.value.trim()
    if (e.which === 13) {
      this.props.onSave(text)
    }
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  handleBlur = e => {
    this.props.onSave(e.target.value)
  }

  render() {
    return (
      <input className={
        classnames({
          edit: this.props.editing,
          'new-card': this.props.newCard
        })}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus="true"
        value={this.state.text}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onKeyDown={this.handleSubmit} />
    )
  }
}
