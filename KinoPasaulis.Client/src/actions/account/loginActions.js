//This is just an example code from another project, so it is commented out.

import axios from 'axios';
import { push } from 'react-router-redux';
import { addErrorMessage } from '../../actionCreators/registerLoginError';

export function login(
    userName,
    password
) {
    return dispatch => {
        return axios.post('/api/account/login', {
            UserName: userName,
            Password: password,
        })
            .then(response => {
                if(response.data === true) {
                    dispatch(push('/home'));
                }else {
                  dispatch(addErrorMessage('Blogai įvesti prisijungimo duomenys'));
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
}