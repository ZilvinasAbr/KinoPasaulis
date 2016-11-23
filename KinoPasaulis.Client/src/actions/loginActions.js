//This is just an example code from another project, so it is commented out.

import axios from 'axios';
import { push } from 'react-router-redux';

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

                }
            })
            .catch(error => {
                console.log(error);
            });
    }
}