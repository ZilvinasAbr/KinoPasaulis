import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import VotesAdminNavigationBar from './votesAdmin/VotesAdminNavigationBar';

class VotesAdminHomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <VotesAdminNavigationBar />
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

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VotesAdminHomePage);