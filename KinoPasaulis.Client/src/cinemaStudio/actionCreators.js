export const RECEIVE_MOVIES = 'cinemaStudio/RECEIVE_MOVIES';
export function receiveMovies(movies) {
  return {
    type: RECEIVE_MOVIES,
    movies
  };
}

export const REMOVE_MOVIE = 'cinemaStudio/REMOVE_MOVIE';
export function removeMovie(movieId) {
  return {
    type: REMOVE_MOVIE,
    movieId
  };
}

export const RECEIVE_MOVIE_CREATORS = 'cinemaStudio/RECEIVE_MOVIE_CREATORS';
export function receiveMovieCreators(movieCreators) {
  return {
    type: RECEIVE_MOVIE_CREATORS,
    movieCreators
  };
}

export const RECEIVE_CINEMA_STUDIOS_STATISTICS = 'cinemaStudio/RECEIVE_CINEMA_STUDIOS_STATISTICS';
export function receiveCinemaStudiosStatistics(cinemaStudiosStatistics) {
  return {
    type: RECEIVE_CINEMA_STUDIOS_STATISTICS,
    cinemaStudiosStatistics
  };
}