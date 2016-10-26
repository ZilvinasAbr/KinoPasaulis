import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TheatherNavigationBar from '../TheatherNavigationBar';
import { Button } from 'react-bootstrap';
import { getEventById } from '../../../../actions/theather/eventActions';
import { Well, Col } from 'react-bootstrap';
import moment from 'moment';
import createFragment from 'react-addons-create-fragment';

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEvent(this.props.params.id);
  }

  getMovieOfEvent(props) {
    let movie;

    movie = createFragment({
      movieDetails: props.movie,
    });

    return movie;
  }

  render() {
    console.log(this.getMovieOfEvent(this.props.event).title);
    return (
      <div>
        <TheatherNavigationBar
          changePageToLanding={this.props.changePageToLanding}
          goToAuditoriums={this.props.goToAuditoriums}
          goToEvents={this.props.goToEvents}
          goToSubscriptions={this.props.goToSubscriptions}
          logOut={this.props.logOut}
        />

        {moment(this.props.event.startTime).format('YYYY/MM/DD')} -
        {moment(this.props.event.endTime).format('YYYY/MM/DD')}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    event: state.theaterPage.event || [],
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
    },

    getEvent: (id) => {
      dispatch(getEventById(id));
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);