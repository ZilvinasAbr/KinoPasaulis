import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { push } from 'react-router-redux';
import { Col, Table } from 'react-bootstrap';

import {
  fetchCinemaStudioMovies,
  deleteMovie
} from '../../actions/movieActions';
import CinemaStudioNavigationBar from '../CinemaStudioNavigationBar';

class MoviesPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddMovie = this.handleAddMovie.bind(this);
    this.handleDeleteMovie = this.handleDeleteMovie.bind(this);
    this.renderMovie = this.renderMovie.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchCinemaStudioMovies());
  }

  handleAddMovie() {
    this.props.dispatch(push('/cinemaStudio/addMovie'));
  }

  handleDeleteMovie(index) {
    let movie = this.props.movies[index];

    this.props.dispatch(deleteMovie(movie.id));
  }

  renderMovie(movie, index) {
    return (
      <tr key={index}>
        <td>{index+1}</td>
        <td>
          <a href="javascript:void(0)"
             onClick={() =>
               this.props.dispatch(
                 push(`/cinemaStudio/movie/${movie.id}`)
               )}>
            {movie.title}
          </a>
        </td>
        <td>{movie.releaseDate}</td>
        <td>{movie.budget}</td>
        <td>{movie.gross}</td>
        <td>{movie.language}</td>
        <td>{movie.ageRequirement}</td>
        <td>
          <Button bsStyle="danger" onClick={() => this.handleDeleteMovie(index)}>
            Pašalinti
          </Button>
        </td>
      </tr>
    )
  }

  render() {
    return (
      <div>
        <CinemaStudioNavigationBar/>
        <Col lg={2} lgOffset={5}>
          <h1>Kino filmai</h1>
        </Col>
        <Col lg={8} lgOffset={2}>
          <Button bsStyle="primary" onClick={this.handleAddMovie}>
            Pridėti filmą
          </Button>
          <Table striped bordered condensed hover>
            <thead>
            <tr>
              <th>#</th>
              <th>Pavadinimas</th>
              <th>Išleidimo data</th>
              <th>Pastatymo kaina</th>
              <th>Pajamos</th>
              <th>Kalba</th>
              <th>Amžiaus cenzas</th>
              <th>Veiksmai</th>
            </tr>
            </thead>
            <tbody>
            {this.props.movies.length > 0 ? this.props.movies.map(this.renderMovie) : (
                <tr>
                  <td colSpan={8}>
                    Nėra filmų
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </div>
    );
  }
}

MoviesPage.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  movies: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

function mapStateToProps(state) {
  return {
    movies: state.cinemaStudioPage.movies || []
  };
}

export default connect(mapStateToProps, null)(MoviesPage);