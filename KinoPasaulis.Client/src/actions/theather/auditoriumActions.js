import axios from 'axios';

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
    return axios.get('/api/theathers/getTheatherAuditoriums')
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      })
  }
}