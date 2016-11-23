import React from 'react';
import { NavItem } from 'react-bootstrap';

const LogoutButton = ({onLogout, eventKey}) => {
  return (
    <NavItem eventKey={eventKey} onClick={onLogout}>
      Atsijungti
    </NavItem>
  )
};

LogoutButton.propTypes = {
  onLogout: React.PropTypes.func.isRequired,
  eventKey: React.PropTypes.number.isRequired
};

export default LogoutButton;