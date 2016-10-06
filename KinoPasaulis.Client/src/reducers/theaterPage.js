import {
  REQUEST_SHOW_AUDITORIUMS,
  RECEIVE_SHOW_AUDITORIUMS
} from '../actionCreators/theaterActionCreators';

export const initialState = {};

function requestShowAuditoriums(state) {
  return state;
}

function receiveShowAuditoriums(state, auditoriums) {
  return Object.assign({}, state, {auditoriums});
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
    default:
      return state;
  }
}