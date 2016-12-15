import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Navigation.css'

class Navigation extends Component {
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
          {this.props.children}
          <Navbar.Collapse>
            <Nav pullLeft>
              <LinkContainer to="/" onlyActiveOnIndex>
                <NavItem eventKey={1}>Board</NavItem>
              </LinkContainer>
              <LinkContainer to="/about" onlyActiveOnIndex>
                <NavItem eventKey={1}>About</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

Navigation.propTypes = {
  fluid: PropTypes.bool.isRequired,
};

export default Navigation;
