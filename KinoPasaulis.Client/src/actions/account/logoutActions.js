import axios from 'axios';
import { push } from 'react-router-redux';

export function logout() {
  return dispatch => {
    axios.post('api/account/logOff')
      .then(response => {
          dispatch(push('/'));
      })
      .catch(error => {
        console.error(error);
      });
  }
}