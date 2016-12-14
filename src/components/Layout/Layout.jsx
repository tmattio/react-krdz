import React, { PropTypes } from 'react';
import Header from '../Header';
import Footer from '../Footer';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}


Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
