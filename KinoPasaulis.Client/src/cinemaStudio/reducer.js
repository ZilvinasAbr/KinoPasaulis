import {
  RECEIVE_MOVIES,
  REMOVE_MOVIE
} from './actionCreators';

export const initialState = {};

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
    default:
      return state;
  }
}