import React from 'react';
import { Jumbotron, Button, Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import Header from '../components/Header';

/* eslint func-names: ["error", "as-needed"] */
const About = function () {
  return (
    <div>
      <Header fluid={false} />
      <Jumbotron>
        <Grid fluid={false}>
          <Row className="show-grid">
            <h1>Hello, world!</h1>
            <p>This is a simple hero unit, a simple jumbotron-style component
              for calling
              extra attention to featured content or information.</p>
            <p>
              <Button bsStyle="primary">Learn more</Button>
            </p>
          </Row>
        </Grid>
      </Jumbotron>

      <Grid fluid={false}>
        <Row className="show-grid">
          <Col xs={12} sm={4}>
            <p>Donec id elit non mi porta gravida at eget metus. Fusce
              dapibus, tellus ac
              cursus commodo, tortor mauris condimentum nibh, ut fermentum
              massa justo sit
              amet risus. Etiam porta sem malesuada magna mollis euismod.
              Donec sed odio dui.
            </p>
            <p>
              <Link className="btn btn-default">
                View details &raquo;
              </Link>
            </p>
          </Col>
          <Col xs={12} sm={4}>
            <p>Donec id elit non mi porta gravida at eget metus. Fusce
              dapibus, tellus ac
              cursus commodo, tortor mauris condimentum nibh, ut fermentum
              massa justo sit
              amet risus. Etiam porta sem malesuada magna mollis euismod.
              Donec sed odio dui.
            </p>
            <p>
              <Link className="btn btn-default">
                View details &raquo;
              </Link>
            </p>
          </Col>
          <Col xs={12} sm={4}>
            <p>Donec id elit non mi porta gravida at eget metus. Fusce
              dapibus, tellus ac
              cursus commodo, tortor mauris condimentum nibh, ut fermentum
              massa justo sit
              amet risus. Etiam porta sem malesuada magna mollis euismod.
              Donec sed odio dui.
            </p>
            <p>
              <Link className="btn btn-default">
                View details &raquo;
              </Link>
            </p>
          </Col>
        </Row>
        <hr />
        <Row className="show-grid">
          <p>&copy; 2016 Krdz, Inc.</p>
        </Row>
      </Grid>
    </div>
  );
};

export default About;
