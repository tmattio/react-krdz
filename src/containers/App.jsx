import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { resetErrorMessage } from '../actions';

const propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  // Injected by React Router
  children: PropTypes.node,
};

class App extends Component {
  handleDismissClick(e) {
    this.props.resetErrorMessage();
    e.preventDefault();
  }

  handleChange(nextValue) {
    this.browserHistory.push(`/${nextValue}`);
  }

  renderErrorMessage() {
    const { errorMessage } = this.props;
    if (!errorMessage) {
      return null;
    }

    return (
      <p
        style={{
          backgroundColor: '#e99',
          padding: 10,
        }}
      >
        <b>{errorMessage}</b>
        {' '}
        (<a href="#" onClick={this.handleDismissClick}>Dismiss</a>)
      </p>
    );
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        {this.renderErrorMessage()}
        {children}
      </div>
    );
  }
}

App.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.substring(1),
});

export default connect(mapStateToProps, { resetErrorMessage })(App);
