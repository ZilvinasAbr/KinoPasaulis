import axios from 'axios';
import {
  requestShowAuditoriums,
  receiveShowAuditoriums
} from '../../actionCreators/theaterActionCreators';

export function addAuditorium(name, seats) {
  return dispatch => {
    return axios.post('/api/theathers/addAuditorium', {
      Name: name,
      Seats: seats
    })
      .then(response => {
        if(response.data === true) {
          console.log('success');
        }else {

        }
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export function getAuditoriums() {
  return dispatch => {
    dispatch(requestShowAuditoriums());

    return axios.get('/api/theathers/getTheatherAuditoriums')
      .then(response => {
        dispatch(receiveShowAuditoriums(response.data));
      })
      .catch(error => {
        console.log(error);
      })
  }
}