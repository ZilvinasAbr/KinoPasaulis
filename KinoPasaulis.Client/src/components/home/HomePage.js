import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TheatherNavigationBar from '../register/theather/TheatherNavigationBar';

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
      dispatch(push('/auditoriums'));
    },

    goToEvents: () => {
      dispatch(push('/events'));
    },

    goToSubscriptions: () => {
      dispatch(push('/subscriptions'));
    },

    logOut: () => {
      dispatch(push('/logout'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);