import axios from 'axios';
import { push } from 'react-router-redux';

import {
  receiveSpecialties,
  receiveJobAdvertisements,
  removeJobAdvertisement
} from '../actionCreators';

export function addJobAdvertisement(
  title,
  description,
  duration,
  payRate,
  movie,
  specialty
) {
  return dispatch => {
    axios.post('/api/jobAdvertisement', {
      title,
      description,
      duration,
      payRate,
      movie,
      specialty
    })
      .then(response => {
        if(response.data) {
          dispatch(push('/cinemaStudio/jobAdvertisements'));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export function fetchSpecialties() {
  return dispatch => {
    axios.get('/api/cinemaStudio/specialties')
      .then(response => {
        dispatch(receiveSpecialties(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function fetchJobAdvertisements() {
  return dispatch => {
    axios.get('/api/jobAdvertisement')
      .then(response => {
        dispatch(receiveJobAdvertisements(response.data))
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function deleteJobAdvertisement(id) {
  return dispatch => {
    axios.delete(`/api/jobAdvertisement/${id}`)
      .then(response => {
        alert('Sėkmingai pašalinote darbo skelbimą');
        dispatch(removeJobAdvertisement(id));
      })
      .catch(error => {
        alert('Nepavyko pašalinti darbo skelbimo');
        console.log(error);
      });
  };
}