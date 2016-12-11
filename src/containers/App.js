import React, { PropTypes } from 'react'
import { Row, Grid, Col } from "react-bootstrap"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import List from '../components/List'
import Header from '../components/Header'
import Footer from '../components/Footer'
import * as CardActions from '../actions'

// Importing Stylesheets
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "designmodo-flat-ui/dist/css/flat-ui.css";

const App = ({cards, actions}) => (
  <div>
    <Header addTask={actions.addCard} />
    <Grid fluid={true}>
      <Row className="show-grid">
        <Col xs={6} md={4}>
          <List cards={cards} actions={actions} />
        </Col>
        <Col xs={6} md={4}>
          <List cards={cards} actions={actions} />
        </Col>
        <Col xs={6} md={4}>
          <List cards={cards} actions={actions} />
        </Col>
      </Row>
    </Grid>
    <Footer cards={cards} />
  </div>
)

App.propTypes = {
  cards: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  cards: state.cards
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(CardActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
