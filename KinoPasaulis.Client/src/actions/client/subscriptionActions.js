import axios from 'axios';
import { push } from 'react-router-redux';
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

export function addSubscription(id) {
  return dispatch => {
    return axios({
      method: 'post',
      url: '/api/client/addSubscription',
      data: id,
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(response => {
        console.log('success');
        alert('Sėkmingai užprenumeravote teatrą!');
        dispatch(push('/home'));
      })
      .catch(error => {
        console.log(error);
      })
  }
}