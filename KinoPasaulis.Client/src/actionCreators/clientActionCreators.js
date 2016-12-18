export const REQUEST_SUBSCRIPTIONS = 'REQUEST_SUBSCRIPTIONS';
export function requestSubscriptions() {
  return {
    type: REQUEST_SUBSCRIPTIONS
  };
}

export const RECEIVE_SUBSCRIPTIONS = 'RECEIVE_SUBSCRIPTIONS';
export function receiveSubscriptions(subscriptions) {
  return {
    type: RECEIVE_SUBSCRIPTIONS,
    subscriptions
  };
}

export const REQUEST_SUBSCRIBED = 'REQUEST_SUBSCRIBED';
export function requestSubscribed() {
  return {
    type: REQUEST_SUBSCRIBED
  };
}

export const RECEIVE_SUBSCRIBED = 'RECEIVE_SUBSCRIBED';
export function receiveSubscribed(subscribed) {
  return {
    type: RECEIVE_SUBSCRIBED,
    subscribed
  };
}
