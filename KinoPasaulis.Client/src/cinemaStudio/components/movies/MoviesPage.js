import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { push } from 'react-router-redux';

import { fetchMovies } from '../../actions/movieActions';
import CinemaStudioNavigationBar from '../CinemaStudioNavigationBar';

class MoviesPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddMovie = this.handleAddMovie.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchMovies());
  }

  handleAddMovie() {
    this.props.dispatch(push('/cinemaStudio/addMovie'));
  }

  renderMovie(movie, index) {
    return (
      <div key={index}>{movie.title}</div>
    )
  }

  render() {
    return (
      <div>
        <CinemaStudioNavigationBar/>
        <Button bsStyle="primary" onClick={this.handleAddMovie}>Add movie</Button>
        <h1>Movies page</h1>
        {this.props.movies.map(this.renderMovie)}
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