import { combineReducers } from 'redux';
import { homePage, initialState as homePageInitialState } from './homePage';
import { landingPage, initialState as landingPageInitialState } from './landingPage';
import { registerPage, initialState as registerPageInitialState } from './registerPage';
import { theaterPage, initialState as theaterPageInitialState } from './theaterPage';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

const reducers = {
  homePage,
  landingPage,
  registerPage,
  theaterPage,
  form: formReducer,
  routing: routerReducer
};

export const reducer = combineReducers(reducers);

export const initialState = {
  landingPage: landingPageInitialState,
  homePage: homePageInitialState,
  registerPage: registerPageInitialState,
  theaterPage: theaterPageInitialState,
  form: {}
};