import axios from 'axios';
import {
  requestShowAuditoriums,
  receiveShowAuditoriums,
  addAuditorium as addAuditoriumToAuditoriums
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
          dispatch(addAuditoriumToAuditoriums({name, seats}));
        }else {
          console.log('response.data returned false')
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

export function deleteAuditorium(id) {
    return axios({
      method: 'delete',
      url: '/api/theathers/deleteAuditorium',
      data: id,
      headers: {
        'Content-type': 'application/json'
      }
    });
}
