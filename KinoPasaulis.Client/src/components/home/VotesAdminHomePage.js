import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import VotesAdminNavigationBar from './votesAdmin/VotesAdminNavigationBar';

class VotesAdminHomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <VotesAdminNavigationBar />
        <h1> Votes Admin Home Page </h1>
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