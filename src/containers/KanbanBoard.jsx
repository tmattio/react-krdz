import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Grid, Col } from 'react-bootstrap';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import 'bootstrap/dist/css/bootstrap.css';
import 'designmodo-flat-ui/dist/css/flat-ui.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import List from '../components/List';
import * as CardActions from '../actions';
import './KanbanBoard.css';

class KanbanBoard extends Component {
  constructor(props) {
    super(props);
    this.findCard = this.findCard.bind(this);
  }

  findCard(id) {
    const { cards } = this.props;
    const card = cards.filter(c => c.id === id)[0];

    return { ...card, index: cards.indexOf(card) };
  }

  render() {
    const { lists, cards, actions } = this.props;
    return (
      <div className="kanban-container">
        <div className="random-background" />
        <Header addCard={actions.addCard} fluid={false} />
        <Grid fluid>
          <Row className="show-grid">
            {lists.map((list, index) => {
              const currentListCards = cards.filter(card => card.listId === list.id);
              return (
                <Col key={index} xs={12} sm={4}>
                  <List
                    key={list.id}
                    cards={currentListCards}
                    findCard={this.findCard}
                    actions={actions}
                    {...list}
                  />
                </Col>
              );
            })}
          </Row>
        </Grid>
        <Footer cards={cards} />
      </div>
    );
  }
}

KanbanBoard.propTypes = {
  cards: PropTypes.arrayOf(React.PropTypes.shape({
    id: PropTypes.string.isRequired,
    listId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  lists: PropTypes.arrayOf(React.PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  /* eslint react/forbid-prop-types: [2, {"forbid": [array, any]}] */
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ cards: state.cards, lists: state.lists });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(CardActions, dispatch),
});

export default DragDropContext(HTML5Backend)(
  connect(mapStateToProps, mapDispatchToProps)(KanbanBoard));
