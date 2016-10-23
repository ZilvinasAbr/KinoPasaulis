import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TheatherNavigationBar from '../TheatherNavigationBar';
import { Button } from 'react-bootstrap';

class Events extends React.Component {
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
        <div className="container">
          <h1> Events </h1>
          <Button bsStyle="primary" onClick={this.props.goToEventCreateForm}> Create new event</Button>
        </div>
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
      dispatch(push('/theather/auditoriums'));
    },

    goToEvents: () => {
      dispatch(push('/theather/events'));
    },

    goToSubscriptions: () => {
      dispatch(push('/theather/subscriptions'));
    },

    logOut: () => {
      dispatch(push('/theather/logout'));
    },

    goToEventCreateForm: () => {
      dispatch(push('/theather/newEvent'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);