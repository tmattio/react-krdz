import React, { Component } from 'react';
import classnames from 'classnames';
import { Grid, Row, Col, Glyphicon, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import './NotFound.css';

export default class NotFound extends Component {
  render() {
    const {
      className,
      ...props
    } = this.props;
    return (
      <div className={classnames('NotFound', className)} {...props}>
        <Grid fluid={false}>
          <Row className="show-grid">
            <Col xs={12}>
              <h1>Oops :(</h1>
              <h2>404 Not Found</h2>
              <div className="error-details">
                Sorry, an error has occured, Requested page not found!
              </div>
              <div className="error-actions">
                <Link to="/">
                  <Button bsStyle="info"><Glyphicon glyph="align-left" />
                    Take Me Home</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
