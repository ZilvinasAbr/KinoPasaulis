import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import CinemaStudioNavigationBar from '../../cinemaStudio/components/CinemaStudioNavigationBar';

class CinemaStudioHomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CinemaStudioNavigationBar />
        <Grid>
          <Row>
            <Col xs={8} xsOffset={2} sm={8} smOffset={2} md={6} mdOffset={3} lg={6} lgOffset={3}>
            <h1>Sveiki prisijungę!</h1>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default CinemaStudioHomePage;