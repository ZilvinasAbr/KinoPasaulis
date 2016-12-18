import {
  REQUEST_SUBSCRIPTIONS,
  RECEIVE_SUBSCRIPTIONS,
  REQUEST_SUBSCRIBED,
  RECEIVE_SUBSCRIBED
} from '../actionCreators/clientActionCreators';

export const initialState = {
  subscribed: false
};

function requestSubscriptions(state)
{
  return state;
}

function receiveSubscriptions(state, subscriptions) {
  return Object.assign({}, state, {subscriptions});
}

function requestSubscribed(state)
{
  return state;
}

function receiveSubscribed(state, subscribed) {
  return Object.assign({}, state, {subscribed});
}

export function clientPage(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SUBSCRIPTIONS:
      return requestSubscriptions(state);
    case RECEIVE_SUBSCRIPTIONS:
      return receiveSubscriptions(state, action.subscriptions);
    case REQUEST_SUBSCRIBED:
      return requestSubscribed(state);
    case RECEIVE_SUBSCRIBED:
      return receiveSubscribed(state, action.subscribed);
    default:
      return state;
  }
}