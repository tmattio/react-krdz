import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// eslint-disable-next-line func-names
const App = function (props) {
  return (
    <div>
      {React.Children.only(props.children)}
    </div>
  );
};

App.propTypes = {
  // Injected by React Router
  children: PropTypes.element.isRequired,
};

export default connect()(App);
