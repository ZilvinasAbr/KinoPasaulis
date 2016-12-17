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
