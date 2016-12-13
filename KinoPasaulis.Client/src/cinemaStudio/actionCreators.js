export const RECEIVE_MOVIES = 'RECEIVE_MOVIES';
export function receiveMovies(movies) {
  return {
    type: RECEIVE_MOVIES,
    movies
  };
}