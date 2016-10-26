import axios from 'axios';
import { push } from 'react-router-redux';

import {
  addEvent as addEventToReducer
} from '../../actionCreators/theaterActionCreators';

export function addEvent(movie, times, startTime, endTime, auditoriums) {
  return dispatch => {
    return axios.post('/api/theathers/addEvent', {
      MovieId: movie,
      Times: times,
      StartTime: startTime,
      EndTime: endTime,
      AuditoriumIds: auditoriums
    })
      .then(response => {
          console.log('success');
          dispatch(push('/theather/events'));
          //dispatch(addEventToReducer({name, seats}));
      })
      .catch(error => {
        console.log(error);
      })
  }
}