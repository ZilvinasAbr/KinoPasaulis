import React from 'react';

const ErrorMessage = ({message}) => (
  <div className="alert alert-danger">
    {message}
  </div>
);

ErrorMessage.propTypes = {
  message: React.PropTypes.string
};

export default ErrorMessage;