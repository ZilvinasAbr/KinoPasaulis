import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ClientNavigationBar from './client/ClientNavigationBar';
import { getTheatherById } from '../../actions/theather/theatherActions';
import { getEventsById } from '../../actions/theather/eventActions';
import { addSubscription } from '../../actions/client/subscriptionActions';
import { Well, Col } from 'react-bootstrap';
import moment from 'moment';

class Theathers extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTheather(this.props.params.id);
    this.props.getEvents(this.props.params.id);
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
            <a className="btn btn-primary" onClick={this.props.goToEventDetails.bind(this, event.id)}> Detaliau </a>
          </Well>
        </Col>
      </div>
    });
  }

  render() {
    return (
      <div>
        <ClientNavigationBar/>
        <div className="container">
          <Col md={3}>
            <h2>{this.props.theather.title}</h2>
            <a className="btn btn-primary" onClick={this.props.addSubscription.bind(this, this.props.theather.id)}> Prenumeruoti </a>
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
    theather: state.theaterPage.theather || {},
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addSubscription: (id) => {
      dispatch(addSubscription(id));
    },
    getTheather: (id) => {
      dispatch(getTheatherById(id));
    },
    getEvents: (id) => {
      dispatch(getEventsById(id));
    },
    goToEventDetails: (id) => {
      dispatch(push('/eventDetails/'+id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Theathers);