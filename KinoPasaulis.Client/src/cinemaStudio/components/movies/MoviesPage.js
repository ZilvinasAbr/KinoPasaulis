import React from 'react';
import { connect } from 'react-redux';

import { fetchMovies } from '../../actions/movieActions';
import CinemaStudioNavigationBar from '../CinemaStudioNavigationBar';

class MoviesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchMovies());
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