export const ADD_ERROR_MESSAGE = 'ADD_ERROR_MESSAGE';
export function addErrorMessage(message) {
  return {
    type: ADD_ERROR_MESSAGE,
    message
  };
}

export const DELETE_ERROR_MESSAGE = 'DELETE_ERROR_MESSAGE';
export function deleteErrorMessage() {
  return {
    type: DELETE_ERROR_MESSAGE
  };
}

