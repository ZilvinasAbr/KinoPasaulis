import axios from 'axios';
import {
  requestShowAuditoriums,
  receiveShowAuditoriums,
  addAuditorium as addAuditoriumToAuditoriums,
  deleteAuditorium as deleteAuditoriumFromAuditoriums,
  requestUpdateAuditorium as requestUpdate,
  updateAuditorium as update
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
          dispatch(getAuditoriums());
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

export function deleteAuditorium(id, arrayId) {
  return dispatch => {

    return axios({
      method: 'delete',
      url: '/api/theathers/deleteAuditorium',
      data: id,
      headers: {
        'Content-type': 'application/json'
      }
    }).then(response => {
      dispatch(deleteAuditoriumFromAuditoriums(arrayId));
    })
      .catch(error => {
        alert('Auditorija nebuvo ištrinta, nes yra priskirta seansams')
      });
  }
}

export function requestUpdateAuditorium(a)
{
  return dispatch => {
    dispatch(requestUpdate(a));
  }
}

export function updateAuditorium(id, name, seats)
{
  return dispatch => {

    return axios({
      method: 'put',
      url: '/api/theathers/updateAuditorium',
      data: { Id: id, Name: name, Seats: seats },
      headers: {
        'Content-type': 'application/json'
      }
    }).then(response => {
      dispatch(update({ Id: id, Name: name, Seats: seats }))
    });

  }
}
