//This is just an example code from another project, so it is commented out.

import axios from 'axios';
import { push } from 'react-router-redux';

export function registerTheather(userName, password, confirmPassword, city, address, email, phone, title) {
  return dispatch => {
    return axios.post('api/account/registerTheather', {
      UserName: userName,
      Password: password,
      ConfirmPassword: confirmPassword,
      City: city,
      Address: address,
      Email: email,
      Phone: phone,
      Title: title
    })
      .then(response => {
        if(response.data === true) {
          dispatch(push('/home'));
        }else {

        }
      })
      .catch(error => {
        console.log(error);
      })
  }
}