import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TheatherNavigationBar from '../TheatherNavigationBar';
import { Button } from 'react-bootstrap';
import { getEvents } from '../../../../actions/theather/eventActions';
import { Well, Col } from 'react-bootstrap';
import moment from 'moment';

class Events extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEvents();
  }

  renderEvents() {
    let events = this.props.events;
    return events.map((event, index) => {
      return <div key={index}>
        <Col md={4}>
          <Well>
            <h2> {event.movie.title} </h2>
            {moment(event.startTime).format('YYYY/MM/DD')} -
            {moment(event.endTime).format('YYYY/MM/DD')}
            <a className="btn btn-primary" onClick={this.props.goToEventDetails.bind(this, event.id)}> Details </a>
          </Well>
        </Col>
      </div>
    });
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
          <Col md={3}>
            <Button bsStyle="primary" onClick={this.props.goToEventCreateForm}> Create new event</Button>
          </Col>

          <Col md={9}>
            <h2> Event list </h2>
            {this.renderEvents()}
          </Col>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.theaterPage.events || [],
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

    getEvents: () => {
      dispatch(getEvents());
    },

    goToEventDetails: (id) => {
      dispatch(push('/theather/eventDetails/'+id))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);