import React, { Component, PropTypes } from "react";
import AddCardTextInput from './AddCardTextInput'
import { Navbar } from "react-bootstrap";

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
            <AddCardTextInput addTask={this.props.addTask}/>
          </Navbar.Form>
        </Navbar>
      </div>
    );
  }
}

Header.propTypes = {
  addTask: PropTypes.func.isRequired
}

export default Header
