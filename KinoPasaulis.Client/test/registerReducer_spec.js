import {expect} from 'chai';
import {registerPage as registerReducer} from '../src/reducers/registerPage';

describe('register reducer', () => {
  it('changes view from main to user', () => {

    const initialState = {
      view: 'main'
    };
    const action = {
      type: 'CHANGE_VIEW_TO_USER_REGISTER'
    };

    const nextState = registerReducer(initialState, action);

    expect(nextState).to.eql({
      view: 'user'
    });
  });

  it('changes view from main to theater', () => {

    const initialState = {
      view: 'main'
    };
    const action = {
      type: 'CHANGE_VIEW_TO_THEATER_REGISTER'
    };

    const nextState = registerReducer(initialState, action);

    expect(nextState).to.eql({
      view: 'theater'
    });
  });

  it('changes view from main to cinemaStudio', () => {

    const initialState = {
      view: 'main'
    };
    const action = {
      type: 'CHANGE_VIEW_TO_CINEMA_STUDIO_REGISTER'
    };

    const nextState = registerReducer(initialState, action);

    expect(nextState).to.eql({
      view: 'cinemaStudio'
    });
  });
});