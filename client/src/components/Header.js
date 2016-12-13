import React, { Component, PropTypes } from "react"
import AddCardTextInput from './AddCardTextInput'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem } from "react-bootstrap"

class Header extends Component {
  renderAddCard() {
    if (this.props.addCard) {
      return (
        <Navbar.Form pullLeft>
          <AddCardTextInput addCard={this.props.addCard}/>
        </Navbar.Form>
      )
    } else {
      return ''
    }
  }

  render() {
    return (
      <div>
        <Navbar inverse fixedTop fluid={this.props.fluid}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Krdz Proto.</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          {this.renderAddCard()}
          <Navbar.Collapse>
            {' '}
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                <Link to="/about">About</Link>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

Header.propTypes = {
  addCard: PropTypes.func,
  fluid: PropTypes.bool.isRequired
}

export default Header
