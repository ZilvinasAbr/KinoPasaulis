import {
  REQUEST_SHOW_AUDITORIUMS,
  RECEIVE_SHOW_AUDITORIUMS,
  ADD_AUDITORIUM,
  DELETE_AUDITORIUM,
  REQUEST_UPDATE_AUDITORIUM,
  UPDATE_AUDITORIUM,
  REQUEST_SHOW_EVENTS,
  RECEIVE_SHOW_EVENTS
} from '../actionCreators/theaterActionCreators';

export const initialState = {};

function requestShowAuditoriums(state) {
  return state;
}

function receiveShowAuditoriums(state, auditoriums) {
  return Object.assign({}, state, {auditoriums});
}

function addAuditorium(state, auditorium) {
  let nextState = Object.assign({}, state, {
    auditoriums: state.auditoriums.slice()
  });

  nextState.auditoriums.push(auditorium);

  return nextState;
}

function deleteAuditorium(state, auditorium) {

  let nextState = Object.assign({}, state, {
    auditoriums: state.auditoriums.slice()
  });

  nextState.auditoriums.splice(auditorium, 1);

  return nextState;
}

function requestUpdateAuditorium(state, auditorium) {
  let nextState = Object.assign({}, state, {
    auditoriumToBeUpdated: auditorium
  });

  return nextState;
}

function requestShowEvents(state)
{
  return state;
}

function receiveShowEvents(state, events) {
  console.log(state);
  console.log(events);
  return Object.assign({}, state, {events});
}

function updateAuditorium(state, auditorium) {
  let nextState = Object.assign({}, state, {
    auditoriums: state.auditoriums.slice()
  });

  let findById = nextState.auditoriums.find(x => x.id === auditorium.Id);
  let index = nextState.auditoriums.indexOf(findById);
  nextState.auditoriums[index].name = auditorium.Name;
  nextState.auditoriums[index].seats = auditorium.Seats;
  return nextState;
}

/**
 * TheaterPage reducer.
 * @param state state before dispatching action
 * @param action action to dispatch
 * @returns next state
 */
export function theaterPage(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SHOW_AUDITORIUMS:
      return requestShowAuditoriums(state);
    case RECEIVE_SHOW_AUDITORIUMS:
      return receiveShowAuditoriums(state, action.auditoriums);
    case ADD_AUDITORIUM:
      return addAuditorium(state, action.auditorium);
    case DELETE_AUDITORIUM:
      return deleteAuditorium(state, action.auditorium);
    case REQUEST_UPDATE_AUDITORIUM:
      return requestUpdateAuditorium(state, action.auditorium);
    case UPDATE_AUDITORIUM:
      return updateAuditorium(state, action.auditorium)
    case REQUEST_SHOW_EVENTS:
      return requestShowEvents(state)
    case RECEIVE_SHOW_EVENTS:
      return receiveShowEvents(state, action.events)
    default:
      return state;
  }
}