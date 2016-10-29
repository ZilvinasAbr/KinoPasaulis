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

  renderShows() {
    let shows = this.props.shows;
    console.log(shows);
    return shows.map((show, index) => {
      return <div key={index}>
        <Col md={4}>
          <Well bsSize={"lg"}>
            <p> Auditorijos pavadinimas: {show.auditorium.name} </p>
            <p> Vietų skaičius: {show.auditorium.seats} </p>
            <p> Seanso pradžia: {moment(show.startTime).format('YYYY/MM/DD HH:MM')}</p>
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
          <h1>{this.props.movie.title}</h1>
          Rodymo laikotarpis:
          {moment(this.props.event.startTime).format('YYYY/MM/DD')} -
          {moment(this.props.event.endTime).format('YYYY/MM/DD')}
          <h1> Seansai </h1>
          {this.renderShows()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    event: state.theaterPage.event || {},
    movie: state.theaterPage.movie || {},
    shows: state.theaterPage.shows || []
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