export const REQUEST_SHOW_AUDITORIUMS = 'REQUEST_SHOW_AUDITORIUMS';
export function requestShowAuditoriums() {
  return {
    type: REQUEST_SHOW_AUDITORIUMS
  };
}

export const RECEIVE_SHOW_AUDITORIUMS = 'RECEIVE_SHOW_AUDITORIUMS';
export function receiveShowAuditoriums(auditoriums) {
  return {
    type: RECEIVE_SHOW_AUDITORIUMS,
    auditoriums
  };
}

export const ADD_AUDITORIUM = 'ADD_AUDITORIUM';
export function addAuditorium(auditorium) {
  return {
    type: ADD_AUDITORIUM,
    auditorium
  };
}

export const DELETE_AUDITORIUM = 'DELETE_AUDITORIUM';
export function deleteAuditorium(auditorium) {
  return {
    type: DELETE_AUDITORIUM,
    auditorium
  };
}

export const REQUEST_UPDATE_AUDITORIUM = 'REQUEST_UPDATE_AUDITORIUM';
export function requestUpdateAuditorium(auditorium) {
  return {
    type: REQUEST_UPDATE_AUDITORIUM,
    auditorium
  };
}

export const UPDATE_AUDITORIUM = 'UPDATE_AUDITORIUM';
export function updateAuditorium(auditorium) {
  return {
    type: UPDATE_AUDITORIUM,
    auditorium
  };
}

export const ADD_EVENT = 'ADD_EVENT';
export function addEvent(event) {
  return {
    type: ADD_EVENT,
    event
  };
}