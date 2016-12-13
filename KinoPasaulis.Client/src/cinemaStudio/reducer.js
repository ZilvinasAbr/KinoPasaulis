import {
  RECEIVE_MOVIES
} from './actionCreators';

export const initialState = {};

function receiveMovies(state, movies) {
  return Object.assign({}, state, { movies });
}

export function cinemaStudioPage(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_MOVIES:
      return receiveMovies(state, action.movies);
    default:
      return state;
  }
}