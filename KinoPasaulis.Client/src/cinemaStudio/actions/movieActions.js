import axios from 'axios';
import { receiveMovies } from '../actionCreators';

export function fetchMovies(query = '') {
  let url;
  if(query === '') {
    url = '/api/cinemaStudio/searchMovies/';
  }else {
    url = `/api/cinemaStudio/searchMovies/${query}`;
  }
  return dispatch => {
    axios.get(url)
      .then(response => {
        dispatch(receiveMovies(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export function addMovie
(
  title,
  releaseDate,
  budget,
  description,
  gross,
  language,
  ageRequirement
) {
  return dispatch => {
    axios.post('/api/cinemaStudio/addMovie', {
      title, releaseDate, budget, description, gross, language, ageRequirement
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function deleteMovie(id) {
  return dispatch => {
    axios.delete(`/api/cinemaStudio/deleteMovie/${id}`)
      .then(response => {
        console.log('deleted');
      })
      .catch(error => {
        console.log(error);
      })
  };
}