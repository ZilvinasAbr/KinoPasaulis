export const REQUEST_SHOW_AUDITORIUMS = 'REQUEST_SHOW_AUDITORIUMS';
export function requestShowAuditoriums() {
  return {
    type: REQUEST_SHOW_AUDITORIUMS
  };
}

export const RECEIVE_SHOW_AUDITORIUMS = 'RECEIVE_SHOW_AUDITORIUMS';
export function receiveShowAuditoriums(auditoriums) {
  return {
    type: RECEIVE_SHOW_AUDITORIUMS,
    auditoriums
  };
}