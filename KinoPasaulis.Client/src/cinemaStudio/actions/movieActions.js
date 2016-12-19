import axios from 'axios';
import { push } from 'react-router-redux';
import {
  receiveMovies,
  removeMovie,
  receiveMovieCreators
} from '../actionCreators';
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

export function fetchCinemaStudioMovies() {
  return dispatch => {
    axios.get('/api/cinemaStudio/movies')
      .then(response => {
        dispatch(receiveMovies(response.data));
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export function addMovie
(
  title,
  hours,
  minutes,
  releaseDate,
  budget,
  description,
  gross,
  language,
  ageRequirement,
  droppedFiles,
  videos,
  movieCreators,
  imageTitles,
  imageDescriptions
) {
  return dispatch => {
    if(droppedFiles.length <= 0) {
      request.post('/api/cinemaStudio/addMovie')
        .send({
          title,
          hours,
          minutes,
          releaseDate,
          budget,
          description,
          gross,
          language,
          ageRequirement,
          imageNames: [],
          videos,
          movieCreators,
          imageTitles,
          imageDescriptions
        })
        .end((err, res) => {
          if(err) {
            alert(res.body);
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
      return;
    }

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
            hours,
            minutes,
            releaseDate,
            budget,
            description,
            gross,
            language,
            ageRequirement,
            imageNames,
            videos,
            movieCreators,
            imageTitles,
            imageDescriptions
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
        dispatch(removeMovie(id));
      })
      .catch(error => {
        alert('Nepavyko pašalinti filmo: filmas jau naudojamas sistemoje');
        console.log(error);
      })
  };
}

export function editMovie(
  id,
  title,
  hours,
  minutes,
  releaseDate,
  budget,
  description,
  gross,
  language,
  ageRequirement,
  videos,
  movieCreators
) {
  return dispatch => {
    request.put(`/api/cinemaStudio/editMovie/${id}`)
      .send({
        title,
        hours,
        minutes,
        releaseDate,
        budget,
        description,
        gross,
        language,
        ageRequirement,
        videos,
        movieCreators
      })
      .end((err, res) => {
        if(err) {
          alert(res.body);
          console.log(err);
          return;
        }
        if(res.body) {
          alert('Sėkmingai paredaguotas filmas');
          dispatch(push('/cinemaStudio/movies'));
        }else {
          alert('Nepavyko redaguoti filmo');
        }
      });
  };
}

export function fetchMovieCreators() {
  return dispatch => {
    axios.get('/api/movieCreator/')
      .then(response => {
        dispatch(receiveMovieCreators(response.data));
      })
      .catch(error => {
        console.log(error);
      })
  }
}