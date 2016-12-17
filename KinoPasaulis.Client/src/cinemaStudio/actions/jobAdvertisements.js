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
    axios.post('/api/cinemaStudio/addJobAdvertisement', {
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
    const mockSpecialties = [
      {
        id: 1,
        title: 'Režisierius'
      },
      {
        id: 2,
        title: 'Aktorius'
      },
      {
        id: 3,
        title: 'Kompozitorius'
      }
    ];

    dispatch(receiveSpecialties(mockSpecialties));
    return;
    axios.get('/api/cinemaStudio/specialties')
      .then(response => {
        dispatch(receiveSpecialties(response.data));
      })
  };
}

export function fetchJobAdvertisements() {
  return dispatch => {
    axios.get('/api/cinemaStudio/jobAdvertisements')
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
    axios.delete(`/api/cinemaStudio/jobAdvertisement/${id}`)
      .then(response => {
        dispatch(removeJobAdvertisement(id));
      })
      .catch(error => {
        console.log(error);
      });
  };
}