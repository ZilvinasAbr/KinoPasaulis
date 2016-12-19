import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import axios from 'axios';
import { Well, Col } from 'react-bootstrap';

import ClientNavigationBar from './client/ClientNavigationBar';

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios.get('/api/client/getMovies')
      .then(response => {

        this.setState(
          {
            movies: response.data
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  paintImage(movie) {
    if (movie.images.length != 0) {
      return <img alt={movie.images[0].title} height="200" width="100%"
                  src={`/uploads/${movie.images[0].url}`}/>;
    }
    return <img height="200" width="100%"
                src={`http://www.jordans.com/~/media/jordans%20redesign/no-image-found.ashx?h=275&la=en&w=275&hash=F87BC23F17E37D57E2A0B1CC6E2E3EEE312AAD5B`}/>;
  }

  renderMovies() {
    let movies = this.state.movies;
    console.log(movies);
    return movies.map((movie, index) => {
      return <div key={index}>
        <Col md={4}>
          <Well>
            {this.paintImage(movie)}
            <h2> {movie.title} </h2>
            <a className="btn btn-primary"> Detaliau </a>
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
            <h2>Filmai</h2>
          </Col>

          <Col md={9}>
            <h2> Filmų sąrašas </h2>
            {this.renderMovies()}
          </Col>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);