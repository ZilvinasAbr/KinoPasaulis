import axios from 'axios';
import {
  requestTheathers,
  receiveTheathers,
  receiveOneTheather
} from '../../actionCreators/theaterActionCreators';

export function getTheathers() {
  return dispatch => {
    dispatch(requestTheathers());

    return axios.get('/api/theathers/getTheathers')
      .then(response => {
        dispatch(receiveTheathers(response.data));
      })
      .catch(error => {
        console.error(error);
      })
  }
}

export function getTheatherById(id) {
  return dispatch => {

    return axios.get('/api/theathers/getTheather?id=' + id)
      .then(response => {
        dispatch(receiveOneTheather(response.data));
      })
      .catch(error => {
        console.error(error);
      })
  }
}