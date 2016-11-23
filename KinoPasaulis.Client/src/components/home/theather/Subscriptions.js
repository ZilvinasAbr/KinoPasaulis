import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { logout } from '../../../actions/account/logoutActions';
import TheatherNavigationBar from './TheatherNavigationBar';

class Subscriptions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TheatherNavigationBar
          changePageToHome={this.props.changePageToHome}
          goToAuditoriums={this.props.goToAuditoriums}
          goToEvents={this.props.goToEvents}
          goToSubscriptions={this.props.goToSubscriptions}
          logout={this.props.logout}
        />
        <h1> Subscriptions </h1>
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
    changePageToHome: () => {
      dispatch(push('/home'));
    },

    goToAuditoriums: () => {
      dispatch(push('/theather/auditoriums'));
    },

    goToEvents: () => {
      dispatch(push('/theather/events'));
    },

    goToSubscriptions: () => {
      dispatch(push('/theather/subscriptions'));
    },

    logout: () => {
      dispatch(logout());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);