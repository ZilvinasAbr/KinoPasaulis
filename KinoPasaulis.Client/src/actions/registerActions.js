import axios from 'axios';
import { push } from 'react-router-redux';

export function register(userName, password, confirmPassword, userType) {
  return dispatch => {
    return axios.post('api/account/register', {
      UserName: userName,
      Password: password,
      ConfirmPassword: confirmPassword,
      UserType: userType
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