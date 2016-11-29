import axios from 'axios';
import { push } from 'react-router-redux';
import { addErrorMessage } from '../../actionCreators/registerLoginError';

export function registerTheather(userName, password, confirmPassword, city, address, email, phone, title) {
  return dispatch => {
    return axios.post('/api/account/registerTheather', {
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
          dispatch(addErrorMessage('Blogai įvesti registracijos duomenys'));
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export function registerCinemaStudio(
  userName,
  email,
  password,
  confirmPassword,
  name,
  city,
  country,
  address,
  phone
) {
  return dispatch => {
    return axios.post('/api/account/registerCinemaStudio', {
      UserName: userName,
      Email: email,
      Password: password,
      ConfirmPassword: confirmPassword,
      Name: name,
      City: city,
      Country: country,
      Address: address,
      Phone: phone
    })
      .then(response => {
        if(response.data === true) {
          dispatch(push('/home'));
        }else {
          dispatch(addErrorMessage('Blogai įvesti registracijos duomenys'));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export function registerMovieCreator(
  userName,
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
  phone,
  birthDate,
  description
) {
  return dispatch => {
    return axios.post('/api/account/registerCinemaStudio', {
      UserName: userName,
      Email: email,
      Password: password,
      ConfirmPassword: confirmPassword,
      FirstName: firstName,
      LastName: lastName,
      Phone: phone,
      BirthDate: birthDate,
      Description: description
    })
      .then(response => {
        if(response.data === true) {
          dispatch(push('/home'));
        }else {
          dispatch(addErrorMessage('Blogai įvesti registracijos duomenys'));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export function registerClient(
  userName,
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
  phone
) {
  return dispatch => {
    return axios.post('/api/account/register', {
      UserName: userName,
      Email: email,
      Password: password,
      ConfirmPassword: confirmPassword,
      FirstName: firstName,
      LastName: lastName,
      Phone: phone
    })
      .then(response => {
        if(response.data === true) {
          dispatch(push('/home'));
        }else {
          dispatch(addErrorMessage('Blogai įvesti registracijos duomenys'));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}