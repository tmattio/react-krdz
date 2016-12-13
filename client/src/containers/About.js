import React, { Component } from 'react';
import classnames from 'classnames';
import { Jumbotron, Button, Grid, Row, Col } from "react-bootstrap"
import Header from '../components/Header'

export default class About extends Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('About', className)} {...props}>
        <Header fluid={false} />
        <Jumbotron>
          <Grid fluid={false}>
            <Row className="show-grid">
              <h1>Hello, world!</h1>
              <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
              <p><Button bsStyle="primary">Learn more</Button></p>
            </Row>
          </Grid>
        </Jumbotron>

        <Grid fluid={false}>
          <Row className="show-grid">
            <Col xs={12} sm={4}>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
              <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
            </Col>
            <Col xs={12} sm={4}>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
              <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
            </Col>
            <Col xs={12} sm={4}>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
              <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
            </Col>
          </Row>
          <hr />
          <Row className="show-grid">
            <p>&copy; 2016 Krdz, Inc.</p>
          </Row>
        </Grid>
      </div>
    );
  }
}
