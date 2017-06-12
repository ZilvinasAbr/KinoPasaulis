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
    url = '/api/movie/searchMovies/';
  }else {
    url = `/api/movie/searchMovies/${query}`;
  }
  return dispatch => {
    axios.get(url)
      .then(response => {
        dispatch(receiveMovies(response.data));
      })
      .catch(error => {
        console.error(error);
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
        console.error(error);
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
      request.post('/api/movie')
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
            console.error(err);
            return;
          }
          if(res.body) {
            dispatch(push('/cinemaStudio/movies'));
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

        request.post('/api/movie')
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
              console.error(err);
              return;
            }
            if(res.body) {
              dispatch(push('/cinemaStudio/movies'));
            }
          });
      }
    });
  };
}

export function deleteMovie(id) {
  return dispatch => {
    axios.delete(`/api/movie/${id}`)
      .then(response => {
        dispatch(removeMovie(id));
        alert('Sėkmingai pašalintas filmas');
      })
      .catch(error => {
        alert('Nepavyko pašalinti filmo: filmas jau naudojamas sistemoje');
        console.error(error);
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
    request.put(`/api/movie/${id}`)
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
          console.error(err);
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
        console.error(error);
      })
  }
}