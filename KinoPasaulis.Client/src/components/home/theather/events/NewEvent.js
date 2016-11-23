import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TheatherNavigationBar from '../TheatherNavigationBar';
import AddEventForm from './AddEventForm';
import { logout } from '../../../../actions/account/logoutActions';
import { getAuditoriums } from '../../../../actions/theather/auditoriumActions';

class NewEvent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAuditoriums();
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
        <div className="container">
          <h1> New event form </h1>
          <AddEventForm auditoriums={this.props.auditoriums} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auditoriums: state.theaterPage.auditoriums || [],
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
    },

    getAuditoriums: () => {
      dispatch(getAuditoriums());
    },

    goToEventCreateForm: () => {
      dispatch(push('/theather/newEvent'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);