import axios from 'axios';
import {
  requestSubscriptions,
  receiveSubscriptions
} from '../../actionCreators/clientActionCreators';

export function getSubscriptions() {
  return dispatch => {
    dispatch(requestSubscriptions());

    return axios.get('/api/client/getSubscriptions')
      .then(response => {
        dispatch(receiveSubscriptions(response.data));
      })
      .catch(error => {
        console.log(error);
      })
  }
}