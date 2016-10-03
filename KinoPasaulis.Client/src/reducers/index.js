import { combineReducers } from 'redux';
import { homePage } from './homePage';
import { landingPage } from './landingPage';
import { registerPage, initialState as registerPageInitialState } from './registerPage';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

const reducers = {
  homePage,
  landingPage,
  registerPage,
  form: formReducer,
  routing: routerReducer
};

export const reducer = combineReducers(reducers);

export const initialState = {
  landingPage: {},
  homePage: {},
  registerPage: registerPageInitialState,
  form: {}
};