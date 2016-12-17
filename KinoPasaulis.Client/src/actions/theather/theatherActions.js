import axios from 'axios';
import {
  requestTheathers,
  receiveTheathers
} from '../../actionCreators/theaterActionCreators';

export function getTheathers() {
  return dispatch => {
    dispatch(requestTheathers());

    return axios.get('/api/theathers/getTheathers')
      .then(response => {
        dispatch(receiveTheathers(response.data));
      })
      .catch(error => {
        console.log(error);
      })
  }
}