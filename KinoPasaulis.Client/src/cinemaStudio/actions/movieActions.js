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