import {
  RECEIVE_MOVIES,
  REMOVE_MOVIE,
  RECEIVE_MOVIE_CREATORS,
  RECEIVE_CINEMA_STUDIOS_STATISTICS
} from './actionCreators';

export const initialState = {
  movies: [],
  movieCreators: [],
  cinemaStudiosStatistics: []
};

function receiveMovies(state, movies) {
  return Object.assign({}, state, { movies });
}

function removeMovie(state, movieId) {
  return Object.assign({}, state, {
    movies: state.movies.filter(movie => movie.id !== movieId)
  })
}

export function cinemaStudioPage(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_MOVIES:
      return receiveMovies(state, action.movies);
    case REMOVE_MOVIE:
      return removeMovie(state, action.movieId);
    case RECEIVE_MOVIE_CREATORS:
      return Object.assign({}, state, {
        movieCreators: action.movieCreators
      });
    case RECEIVE_CINEMA_STUDIOS_STATISTICS:
      return Object.assign({}, state, {
          cinemaStudiosStatistics: action.cinemaStudiosStatistics
      });
    default:
      return state;
  }
}