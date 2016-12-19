import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ClientNavigationBar from './client/ClientNavigationBar';
import { getTheatherById } from '../../actions/theather/theatherActions';
import { getEventsById } from '../../actions/theather/eventActions';
import { addSubscription, removeSubscription, isSubscribedToTheather } from '../../actions/client/subscriptionActions';
import { Well, Col } from 'react-bootstrap';
import moment from 'moment';

class Theathers extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTheather(this.props.params.id);
    this.props.getEvents(this.props.params.id);
    this.props.isSubscribedToTheather(this.props.params.id);
  }

  paintImage(event) {
    if (event.movie.images.length != 0) {
      return <img alt={event.movie.images[0].title} height="200" width="100%" src={`/uploads/${event.movie.images[0].url}`} />;
    }
    return <img height="200" width="100%" src={`http://www.jordans.com/~/media/jordans%20redesign/no-image-found.ashx?h=275&la=en&w=275&hash=F87BC23F17E37D57E2A0B1CC6E2E3EEE312AAD5B`} />;
  }

  renderSubscribeButton() {
    let subscribed = this.props.subscribed;
    if (subscribed)
    {
      return <a className="btn btn-primary" onClick={this.props.removeSubscription.bind(this, this.props.theather.id)}> Atšaukti prenumeratą </a>
    }
    else
    {
      return <a className="btn btn-primary" onClick={this.props.addSubscription.bind(this, this.props.theather.id)}> Prenumeruoti </a>
    }
  }

  renderEvents() {
    let events = this.props.events;
    return events.map((event, index) => {
      return <div key={index}>
        <Col md={4}>
          <Well>
            {this.paintImage(event)}
            <a><h2> {event.movie.title} </h2></a>
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
            <p> Adresas: {this.props.theather.address}</p>
            <p> Miestas: {this.props.theather.city}</p>
            <p> Šalis: {this.props.theather.country}</p>
            <p> Telefonas: {this.props.theather.phone}</p>
            <p> El. paštas: {this.props.theather.email}</p>
            {this.renderSubscribeButton()}
          </Col>

          <Col md={9}>
            <h2> Rodomi filmai </h2>
            {this.renderEvents()}
          </Col>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.theaterPage.events,
    theather: state.theaterPage.theather,
    subscribed: state.clientPage.subscribed,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addSubscription: (id) => {
      dispatch(addSubscription(id));
    },
    removeSubscription: (id) => {
      dispatch(removeSubscription(id));
    },
    isSubscribedToTheather: (id) => {
      dispatch(isSubscribedToTheather(id));
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