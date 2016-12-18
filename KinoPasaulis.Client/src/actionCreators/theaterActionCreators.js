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

export const REQUEST_THEATHERS = 'REQUEST_THEATHERS';
export function requestTheathers() {
  return {
    type: REQUEST_THEATHERS
  };
}

export const RECEIVE_THEATHERS = 'RECEIVE_THEATHERS';
export function receiveTheathers(theathers) {
  return {
    type: RECEIVE_THEATHERS,
    theathers
  };
}

export const RECEIVE_ONE_THEATHER = 'RECEIVE_ONE_THEATHER';
export function receiveOneTheather(theather) {
  return {
    type: RECEIVE_ONE_THEATHER,
    theather
  };
}

export const RECEIVE_ONE_EVENT = 'RECEIVE_ONE_SHOW';
export function receiveOneEvent(event) {
  return {
    type: RECEIVE_ONE_EVENT,
    event
  };
}

export const REQUEST_THEATER_SUBSCRIBERS = 'REQUEST_THEATER_SUBSCRIBERS';
export function requestSubscribers() {
    return {
        type: REQUEST_THEATER_SUBSCRIBERS,
    };
}

export const RECEIVE_THEATER_SUBSCRIBERS = 'RECEIVE_THEATER_SUBSCRIBERS';
export function receiveSubscribers(subscribers) {
    return {
        type: RECEIVE_THEATER_SUBSCRIBERS,
        subscribers
    };
}

export const SEND_ANNOUNCEMENT = 'SEND_ANNOUNCEMENT';
export function sendAnnouncement(announcement) {
  return {
    type: RECEIVE_THEATER_SUBSCRIBERS,
    announcement
  };
}

export const GET_STATISTICS = 'GET_STATISTICS';
export function getStatistics(statistics) {
  return {
    type: GET_STATISTICS,
    statistics
  };
}