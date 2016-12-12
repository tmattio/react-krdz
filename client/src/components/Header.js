import React, { Component, PropTypes } from "react"
import AddCardTextInput from './AddCardTextInput'
import { Navbar } from "react-bootstrap"

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Krdz Proto.</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Form pullRight>
            <AddCardTextInput addCard={this.props.addCard}/>
          </Navbar.Form>
        </Navbar>
      </div>
    )
  }
}

Header.propTypes = {
  addCard: PropTypes.func.isRequired
}

export default Header
