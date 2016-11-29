import {
  ADD_ERROR_MESSAGE,
  DELETE_ERROR_MESSAGE
} from '../actionCreators/registerLoginError';

export const initialState = {};

export function registerLoginError(state = initialState, action) {
  switch (action.type) {
    case ADD_ERROR_MESSAGE:
      return Object.assign({}, state, { message: action.message });
    case DELETE_ERROR_MESSAGE:
      return initialState;
    default:
      return state;
  }
}