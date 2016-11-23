import React from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import LogoutButton from '../../common/LogoutButton';

const CinemaStudioNavigationBar = ({logout, changePageToHome}) => {
  return (
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="javascript:void(0)" onClick={changePageToHome}>Kino Pasaulis</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullLeft>
        </Nav>
        <Nav pullRight>
          <LogoutButton
            onLogout={logout}
            eventKey={1}
          />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

CinemaStudioNavigationBar.propTypes = {
  changePageToHome: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired
};

export default CinemaStudioNavigationBar;