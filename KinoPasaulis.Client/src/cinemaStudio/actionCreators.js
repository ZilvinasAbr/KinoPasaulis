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

export const RECEIVE_CINEMA_STUDIOS_MOVIES_STATISTICS =
  'cinemaStudio/RECEIVE_CINEMA_STUDIOS_MOVIES_STATISTICS';
export function receiveCinemaStudiosMoviesStatistics(cinemaStudiosMoviesStatistics) {
  return {
    type: RECEIVE_CINEMA_STUDIOS_MOVIES_STATISTICS,
    moviesStatistics: cinemaStudiosMoviesStatistics
  };
}

export const RECEIVE_SPECIALTIES = 'cinemaStudio/RECEIVE_SPECIALTIES';
export function receiveSpecialties(specialties) {
  return {
    type: RECEIVE_SPECIALTIES,
    specialties
  };
}

export const RECEIVE_JOB_ADVERTISEMENTS = 'cinemaStudio/RECEIVE_JOB_ADVERTISEMENTS';
export function receiveJobAdvertisements(jobAdvertisements) {
  return {
    type: RECEIVE_JOB_ADVERTISEMENTS,
    jobAdvertisements
  };
}

export const REMOVE_JOB_ADVERTISEMENT = 'cinemaStudio/REMOVE_JOB_ADVERTISEMENT';
export function removeJobAdvertisement(jobAdvertisementId) {
  return {
    type: REMOVE_JOB_ADVERTISEMENT,
    jobAdvertisementId
  };
}