export const REQUEST_USER_DATA = 'REQUEST_USER_DATA';
export function requestUserData() {
  return {
    type: REQUEST_USER_DATA
  };
}

export const RECEIVE_USER_DATA = 'RECEIVE_USER_DATA';
export function receiveUserData(userData) {
  return {
    type: RECEIVE_USER_DATA,
    userData
  };
}