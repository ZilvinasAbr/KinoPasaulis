export const RECEIVE_MOVIES = 'RECEIVE_MOVIES';
export function receiveMovies(movies) {
  return {
    type: RECEIVE_MOVIES,
    movies
  };
}

export const REMOVE_MOVIE = 'REMOVE_MOVIE';
export function removeMovie(movieId) {
  return {
    type: REMOVE_MOVIE,
    movieId
  };
}