import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TheatherNavigationBar from '../TheatherNavigationBar';
import { Button } from 'react-bootstrap';
import { getEvents } from '../../../../actions/theather/eventActions';
import { Well, Col } from 'react-bootstrap';
import moment from 'moment';
import { logout } from '../../../../actions/account/logoutActions';


class Events extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEvents();
  }

  paintImage(event) {
  if (event.movie.images.length != 0) {
    return <img alt={event.movie.images[0].title} height="200" width="100%" src={`/uploads/${event.movie.images[0].url}`} />;
  }
  return <img height="200" width="100%" src={`http://www.jordans.com/~/media/jordans%20redesign/no-image-found.ashx?h=275&la=en&w=275&hash=F87BC23F17E37D57E2A0B1CC6E2E3EEE312AAD5B`} />;
}

  renderEvents() {
    let events = this.props.events;

    return events.map((event, index) => {
      return <div key={index}>
        <Col md={4}>
          <Well>
            {this.paintImage(event)}
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
          changePageToHome={this.props.changePageToHome}
          goToAuditoriums={this.props.goToAuditoriums}
          goToEvents={this.props.goToEvents}
          goToSubscriptions={this.props.goToSubscriptions}
          logout={this.props.logout}
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