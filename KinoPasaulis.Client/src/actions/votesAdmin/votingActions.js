import axios from 'axios';
import { push } from 'react-router-redux';
import request from 'superagent';

export function addVoting
(
  title,
  startDate,
  endDate,
  movieCreators
) {
  return dispatch => {
      request.post('/api/voting/addVoting')
        .send({
          title,
          startDate,
          endDate,
          movieCreators
        })
        .end((err, res) => {
          if(err) {
            console.log(err);
            return;
          }
          if(res.body) {
            dispatch(push('/votesAdmin/votings'));
          }else {
            console.log('unsuccessful addVoting');
          }
        });
  };
}

/*export function deleteMovie(id) {
  return dispatch => {
    axios.delete(`/api/movie/${id}`)
      .then(response => {
        dispatch(removeMovie(id));
      })
      .catch(error => {
        alert('Nepavyko pašalinti filmo: filmas jau naudojamas sistemoje');
        console.log(error);
      })
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
}*/