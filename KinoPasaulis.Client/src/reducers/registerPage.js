import {
  CHANGE_VIEW_TO_USER_REGISTER,
  CHANGE_VIEW_TO_THEATER_REGISTER,
  CHANGE_VIEW_TO_CINEMA_STUDIO_REGISTER
} from '../actionCreators/registerActionCreators';

export const initialState = {
  view: 'main'
};

function changeViewToUserRegister(state) {
  return Object.assign({}, state, { view: 'user' });
}

function changeViewToTheaterRegister(state) {
  return Object.assign({}, state, { view: 'theater' });
}

function changeViewToCinemaStudioRegister(state) {
  return Object.assign({}, state, { view: 'cinemaStudio' });
}

export function registerPage(state = initialState, action) {
  switch (action.type) {
    case CHANGE_VIEW_TO_USER_REGISTER:
      return changeViewToUserRegister(state);
    case CHANGE_VIEW_TO_THEATER_REGISTER:
      return changeViewToTheaterRegister(state);
    case CHANGE_VIEW_TO_CINEMA_STUDIO_REGISTER:
      return changeViewToCinemaStudioRegister(state);
    default:
      return state;
  }
}