import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { push } from 'react-router-redux';
import { logout } from '../../actions/account/logoutActions';
import TheatherNavigationBar from './theather/TheatherNavigationBar';
import { Well, Col, ButtonToolbar, OverlayTrigger, Button, Popover, Modal, FormControl, Thumbnail } from 'react-bootstrap';

class TheatherHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  paintImage(movie) {
    if (movie.images.length != 0) {
      return `/uploads/${movie.images[0].url}`;
    }
    return `http://www.jordans.com/~/media/jordans%20redesign/no-image-found.ashx?h=275&la=en&w=275&hash=F87BC23F17E37D57E2A0B1CC6E2E3EEE312AAD5B`;
  }

  renderEvents() {
    let movies = this.state.movies;

    return movies.map((movie, index) => {
      return <div key={index}>
        <Col md={4}>
          <Thumbnail src={this.paintImage(movie)} alt="242x200">
            <h2> {movie.title} </h2>
            <h3> {movie.cinemaStudio.name} </h3>
            <p> {movie.description} </p>
          </Thumbnail>
        </Col>
      </div>
    });
  }

  componentDidMount() {
    axios.get('/api/Movie/newestMovies')
      .then(response => {
        this.setState(
          {
            movies: response.data
          });
      })
      .catch(error => {
        console.error(error);
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
          <h1> Kino studijų sukurti naujausi filmai </h1>
          {this.renderEvents()}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheatherHomePage);