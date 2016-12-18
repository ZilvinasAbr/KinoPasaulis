import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ClientNavigationBar from './client/ClientNavigationBar';
import { getEventById } from '../../actions/theather/eventActions';
import { Well, Col } from 'react-bootstrap';
import moment from 'moment';

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEvent(this.props.params.id);
  }

  /*renderShows() {
    let shows = this.props.shows;
    return shows.map((show, index) => {
      var now = new Date();
      let showOver = null;
      if(moment(show.startTime).format('YYYY/MM/DD HH:MM') < moment(now).format('YYYY/MM/DD HH:mm'))
      {
        showOver = "showOver";
      }
      return <div key={index}>
        <Col md={4}>
          <Well bsSize={"lg"} className={showOver}>
            <p> Auditorijos pavadinimas: {show.auditorium.name} </p>
            <p> Vietų skaičius: {show.auditorium.seats} </p>
            <p> Seanso pradžia: {moment(show.startTime).format('YYYY/MM/DD HH:mm')}</p>
            {this.renderEditDeleteButtons(showOver, show.id, index)}
          </Well>
        </Col>
      </div>
    });
  }*/

  render() {
    return (
      <div>
        <ClientNavigationBar/>
        <div className="container">
          <h1>{this.props.movie.title}</h1>
          Rodymo laikotarpis:
          {moment(this.props.event.startTime).format('YYYY/MM/DD')} -
          {moment(this.props.event.endTime).format('YYYY/MM/DD')}
          <h1> Seansai </h1>
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
    getEvent: (id) => {
      dispatch(getEventById(id));
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);