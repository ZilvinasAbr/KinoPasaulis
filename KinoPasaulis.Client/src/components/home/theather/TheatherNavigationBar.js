import React from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import LogoutButton from '../../common/LogoutButton';

const TheatherNavigationBar = ({logout, changePageToHome, goToAuditoriums, goToEvents, goToSubscriptions, changePageToProfile}) => {
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
          <NavItem eventKey={1} onClick={goToAuditoriums}> Auditorijos </NavItem>
          <NavItem eventKey={2} onClick={goToEvents}> Ivykiai </NavItem>
          <NavItem eventKey={3} onClick={goToSubscriptions}> Prenumeratos </NavItem>
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

TheatherNavigationBar.propTypes = {
  changePageToHome: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
  goToAuditoriums: React.PropTypes.func.isRequired,
  goToEvents: React.PropTypes.func.isRequired,
  goToSubscriptions: React.PropTypes.func.isRequired,
  changePageToProfile: React.PropTypes.func.isRequired
};

export default TheatherNavigationBar;