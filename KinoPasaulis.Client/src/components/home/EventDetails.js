import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Well, Col, Button } from 'react-bootstrap';
import moment from 'moment';

import ClientNavigationBar from './client/ClientNavigationBar';
import { getEventById } from '../../actions/theather/eventActions';
import OrderComponent from './OrderComponent';


class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thisWeeksShows : []
    };

    this.addOrder = this.addOrder.bind(this);
  }

  addOrder(showId, amount) {
    axios.post('/api/client/addOrder', {
      ShowId: showId,
      Amount: amount
    })
      .then(response => {
        if (response.data == true) {
          console.log('success');
          alert("Sėkmingai užsisakėte bilietą");
          axios.get('/api/theathers/ThisWeekShows?eventId=' + this.props.params.id)
            .then(response => {

              this.setState(
                {
                  thisWeeksShows: response.data
                });
            })
            .catch(error => {
              console.log(error);
            });
          this.props.getEvent(this.props.params.id);
        } else {
          alert('Pasirinktas blogas bilietų kiekis');
          console.log('response.data returned false');
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    axios.get('/api/theathers/ThisWeekShows?eventId=' + this.props.params.id)
      .then(response => {

        this.setState(
          {
            thisWeeksShows: response.data
          });
      })
      .catch(error => {
        console.log(error);
      });

    this.props.getEvent(this.props.params.id);
  }

  paintImage() {
    if (this.props.movie.length != 0)
    {
      if (this.props.movie.images.length != 0) {
        return <img alt={this.props.movie.images[0].title} height="450"  src={`/uploads/${this.props.movie.images[0].url}`} />;
      }
      return <p> No image found</p>;
    }
  }

  renderThisWeeksShows() {
    let shows = this.state.thisWeeksShows;
    if (shows.length == 0)
    {
      return <h3>Nėra seansų</h3>
    }
    return shows.map((show, index) => {

      return <OrderComponent key={index} index={index} addOrder={this.addOrder} show={show} />

    });
  }

  renderShows() {
    let shows = this.props.shows;
    if (shows.length == 0)
    {
      return <h3>Nėra seansų</h3>
    }
    return shows.map((show, index) => {

      return <OrderComponent key={index} index={index} addOrder={this.addOrder} show={show} />

    });
  }

  render() {
    return (
      <div>
        <ClientNavigationBar/>
        <div className="container">
          <Col md={5}>
            <h1>{this.props.movie.title}</h1>
            <p> {this.props.movie.description} </p>
            Rodymo laikotarpis:
            {moment(this.props.event.startTime).format('YYYY/MM/DD')} -
            {moment(this.props.event.endTime).format('YYYY/MM/DD')}
            <hr/>
          </Col>
          <Col md={7}>
            {this.paintImage()}
          </Col>
        </div>
        <div className="container">
          <h1> Ateinančios savaitės seansai </h1>
          {this.renderThisWeeksShows()}
        </div>
        <div className="container">
          <h1> Visi seansai </h1>
          {this.renderShows()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    event: state.theaterPage.event || {},
    movie: state.theaterPage.movie || [],
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