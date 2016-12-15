import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class App extends React.PureComponent {
  render() {
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    return (
      <div>
        {React.Children.only(this.props.children)}
      </div>
    );
  }
}

App.propTypes = {
  // Injected by React Router
  children: PropTypes.element.isRequired,
};

export default connect()(App);
