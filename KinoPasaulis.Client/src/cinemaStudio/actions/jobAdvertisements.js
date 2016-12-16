import axios from 'axios';
import { push } from 'react-router-redux';

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
          dispatch(push('/home'));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}