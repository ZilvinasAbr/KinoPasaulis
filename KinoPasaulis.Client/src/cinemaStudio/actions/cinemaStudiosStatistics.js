import axios from 'axios';

import {
  receiveCinemaStudiosStatistics
} from '../actionCreators';

export function fetchCinemaStudioStatistics() {
  return dispatch => {
    const mockData = [
      {
        name: 'Kino Studija 1',
        moviesCount: 3
      },
      {
        name: 'Kino Studija 2',
        moviesCount: 12
      }
    ];

    dispatch(receiveCinemaStudiosStatistics(mockData));
    return;

    axios.get('/api/cinemaStudio/statistics')
      .then(response => {
        dispatch(receiveCinemaStudiosStatistics(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  }
}