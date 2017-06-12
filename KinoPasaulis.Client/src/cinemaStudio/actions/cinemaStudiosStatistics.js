import axios from 'axios';

import {
  receiveCinemaStudiosStatistics,
  receiveCinemaStudiosMoviesStatistics
} from '../actionCreators';

export function fetchCinemaStudioStatistics() {
  return dispatch => {
    axios.get('/api/cinemaStudio/statistics')
      .then(response => {
        dispatch(receiveCinemaStudiosStatistics(response.data));
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export function fetchCinemaStudiosMoviesStatistics() {
  return dispatch => {
    axios.get('/api/cinemaStudio/moviesStatistics')
      .then(response => {
        dispatch(receiveCinemaStudiosMoviesStatistics(response.data));
      })
      .catch(error => {
        console.error(error);
      });
  }
}