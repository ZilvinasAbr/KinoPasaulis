import React from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import MovieCreatorNavigationBar from './movieCreator/MovieCreatorNavigationBar';

class MovieCreatorHomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MovieCreatorNavigationBar />
        <Grid>
          <Row>
            <Col>
              <h1> Sveiki prisijungę! </h1>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect()(MovieCreatorHomePage);