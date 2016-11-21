import {
  REQUEST_USER_DATA,
  RECEIVE_USER_DATA
} from '../actionCreators/homePageActionCreators';

export const initialState = {};

function requestUserData(state) {
  return state;
}

function receiveUserData(state, userData) {
  return Object.assign({}, state, { userData });
}

export function homePage(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER_DATA:
      return requestUserData(state);
    case RECEIVE_USER_DATA:
      return receiveUserData(state, action.userData);
    default:
      return state;
  }
}