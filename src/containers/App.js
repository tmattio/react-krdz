import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import KanbanBoard from '../components/KanbanBoard'
import Footer from '../components/Footer'
import * as CardActions from '../actions'

// Importing Stylesheets
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "designmodo-flat-ui/dist/css/flat-ui.css";

const App = ({cards, lists, actions}) => (
  <div>
    <Header addCard={actions.addCard} />
    <KanbanBoard id={'F4sP3vRt'} cards={cards} lists={lists} actions={actions} />
    <Footer cards={cards} />
  </div>
)

App.propTypes = {
  cards: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  cards: state.cards,
  lists: state.lists
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(CardActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
