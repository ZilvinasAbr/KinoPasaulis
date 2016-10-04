import React from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';

const TheatherNavigationBar = ({logOut, changePageToLanding, goToAuditoriums, goToEvents, goToSubscriptions}) => {
  return (
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="javascript:void(0)" onClick={changePageToLanding}>Kino Pasaulis</a>
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
          <NavItem eventKey={1} onClick={logOut}>Atsijungti</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

TheatherNavigationBar.propTypes = {
  changePageToLanding: React.PropTypes.func.isRequired,
  logOut: React.PropTypes.func.isRequired,
  goToAuditoriums: React.PropTypes.func.isRequired,
  goToEvents: React.PropTypes.func.isRequired,
  goToSubscriptions: React.PropTypes.func.isRequired
};

export default TheatherNavigationBar;