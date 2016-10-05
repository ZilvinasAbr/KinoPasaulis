//This is just an example code from another project, so it is commented out.

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