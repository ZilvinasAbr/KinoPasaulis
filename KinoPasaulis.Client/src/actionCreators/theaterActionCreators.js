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

export const REQUEST_SHOW_EVENTS = 'REQUEST_SHOW_EVENTS';
export function requestShowEvents() {
  return {
    type: REQUEST_SHOW_EVENTS
  };
}

export const RECEIVE_SHOW_EVENTS = 'RECEIVE_SHOW_EVENTS';
export function receiveShowEvents(events) {
  return {
    type: RECEIVE_SHOW_EVENTS,
    events
  };
}

export const RECEIVE_ONE_EVENT = 'RECEIVE_ONE_SHOW';
export function receiveOneEvent(event) {
  return {
    type: RECEIVE_ONE_EVENT,
    event
  };
}

export const DELETE_ONE_SHOW = 'DELETE_ONE_SHOW';
export function deleteOneShow(show) {
  console.log(show);
  return {
    type: DELETE_ONE_SHOW,
    show
  }
}