import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AddCardTextInput from './AddCardTextInput';

class Header extends Component {
  renderAddCard() {
    if (this.props.addCard) {
      return (
        <Navbar.Form pullRight>
          <AddCardTextInput addCard={this.props.addCard} />
        </Navbar.Form>
      );
    }
    return '';
  }

  render() {
    return (
      <div>
        <Navbar inverse fixedTop fluid={this.props.fluid}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Krdz Proto.</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          {this.renderAddCard()}
          <Navbar.Collapse>
            <Nav pullLeft>
              <LinkContainer to="/">
                <NavItem eventKey={1}>Board</NavItem>
              </LinkContainer>
              <LinkContainer to="/about">
                <NavItem eventKey={1}>About</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

Header.propTypes = {
  addCard: PropTypes.func,
  fluid: PropTypes.bool.isRequired,
};

export default Header;
