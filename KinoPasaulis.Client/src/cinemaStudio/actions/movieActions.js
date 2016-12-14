import axios from 'axios';
import { push } from 'react-router-redux';
import { receiveMovies } from '../actionCreators';
import request from 'superagent';

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
  ageRequirement,
  droppedFiles
) {
  return dispatch => {

    let req = request.post('/api/cinemaStudio/uploadImage');
    droppedFiles.forEach(file => {
      req.attach(file.name, file);
    });
    req.end((err, res) => {
      if(!err) {

        let imageNames = res.body;

        request.post('/api/cinemaStudio/addMovie')
          .send({
            title,
            releaseDate,
            budget,
            description,
            gross,
            language,
            ageRequirement,
            imageNames
          })
          .end((err, res) => {
            if(err) {
              console.log(err);
              return;
            }
            if(res.body) {
              console.log('successful addMovie');
              dispatch(push('/cinemaStudio/movies'));
            }else {
              console.log('unsuccessful addMovie');
            }
          });
      }
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