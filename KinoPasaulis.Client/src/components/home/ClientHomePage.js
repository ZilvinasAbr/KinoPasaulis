import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
//import CinemaStudioNavigationBar from './cinemaStudio/TheatherNavigationBar';

class ClientPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1> Client Home Page </h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClientPage);