import axios from 'axios';
import { push } from 'react-router-redux';
import {
  addEvent as addEventToReducer,
  requestShowEvents,
  receiveShowEvents,
  receiveOneEvent,
  deleteOneShow,
  getStatistics as getSeatStatistics
} from '../../actionCreators/theaterActionCreators';

export function addEvent(movie, times, startTime, endTime, auditoriums) {
  return dispatch => {
    return axios.post('/api/theathers/addEvent', {
      MovieId: movie,
      Times: times,
      StartTime: startTime,
      EndTime: endTime,
      AuditoriumIds: auditoriums
    })
      .then(response => {
          alert('Įvykis sėkmingai sukurtas');
          dispatch(push('/theather/events'));
      })
      .catch(error => {
        console.error(error);
        alert('Įvykio nesukurtas. Patikrinkite įvestus duomenis');
      })
  }
}

export function getStatistics(id) {
  return dispatch => {
    return axios.get('/api/theathers/statistics?id=' + id)
      .then(response => {
        dispatch(getSeatStatistics(response.data))
      })
      .catch(error => {
        console.error(error);
      })
  }
}

export function getEvents() {
  return dispatch => {
    dispatch(requestShowEvents());

    return axios.get('/api/theathers/getActiveTheatherEvents')
      .then(response => {
        dispatch(receiveShowEvents(response.data));
      })
      .catch(error => {
        console.error(error);
      })
  }
}

export function getEventsById(id) {
  return dispatch => {
    dispatch(requestShowEvents());

    return axios.get('/api/theathers/getTheatherEvents?id=' + id)
      .then(response => {
        dispatch(receiveShowEvents(response.data));
      })
      .catch(error => {
        console.error(error);
      })
  }
}

export function getEventById(id) {
  return dispatch => {

    return axios.get('/api/theathers/getEvent?id=' + id)
      .then(response => {
        dispatch(receiveOneEvent(response.data));
      })
      .catch(error => {
        console.error(error);
      })
  }
}

export function deleteShowById(id, arrayId) {
  return dispatch => {

    return axios({
      method: 'delete',
      url: '/api/theathers/deleteShow',
      data: id,
      headers: {
        'Content-type': 'application/json'
      }
    }).then(response => {
      dispatch(deleteOneShow(arrayId));
    })
      .catch(error => {
        console.error(error);
      });
  }
}
