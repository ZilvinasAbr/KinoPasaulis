import {
  REQUEST_SUBSCRIPTIONS,
  RECEIVE_SUBSCRIPTIONS
} from '../actionCreators/clientActionCreators';

export const initialState = {};

function requestSubscriptions(state)
{
  return state;
}

function receiveSubscriptions(state, subscriptions) {
  return Object.assign({}, state, {subscriptions});
}

export function clientPage(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SUBSCRIPTIONS:
      return requestSubscriptions(state);
    case RECEIVE_SUBSCRIPTIONS:
      return receiveSubscriptions(state, action.subscriptions);
    default:
      return state;
  }
}