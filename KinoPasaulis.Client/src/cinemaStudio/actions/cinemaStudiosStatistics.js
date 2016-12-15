import axios from 'axios';

import {
  receiveCinemaStudiosStatistics
} from '../actionCreators';

export function fetchCinemaStudioStatistics() {
  return dispatch => {
    axios.get('/api/cinemaStudio/statistics')
      .then(response => {
        dispatch(receiveCinemaStudiosStatistics(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  }
}