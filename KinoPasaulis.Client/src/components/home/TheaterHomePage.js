import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TheatherNavigationBar from './theather/TheatherNavigationBar';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() { 
    return (
      <div>
        <TheatherNavigationBar
          changePageToLanding={this.props.changePageToLanding}
          goToAuditoriums={this.props.goToAuditoriums}
          goToEvents={this.props.goToEvents}
          goToSubscriptions={this.props.goToSubscriptions}
          logOut={this.props.logOut}
        />
        <h1> HomePage </h1>
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
    changePageToLanding: () => {
      dispatch(push('/'));
    },

    goToAuditoriums: () => {
      dispatch(push('theather/auditoriums'));
    },

    goToEvents: () => {
      dispatch(push('theather/events'));
    },

    goToSubscriptions: () => {
      dispatch(push('theather/subscriptions'));
    },

    logOut: () => {
      dispatch(push('theather/logout'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);