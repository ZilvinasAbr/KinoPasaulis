import React from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { logout } from '../../../actions/account/logoutActions';
import LogoutButton from '../../common/LogoutButton';

const ClientNavigationBar = ({logout, changePageToHome, goToMovies, changePageToProfile, goToAnnouncements, goToOrders}) => {
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
          <NavItem eventKey={1} onClick={goToOrders}> Mano užsakymai </NavItem>
        </Nav>
        <Nav pullLeft>
          <NavItem eventKey={1} onClick={goToAnnouncements}> Pranešimai </NavItem>
        </Nav>
        <Nav pullLeft>
          <NavItem eventKey={1} onClick={goToMovies}> Filmai </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} onClick={changePageToProfile}>Profilis</NavItem>
          <LogoutButton
            onLogout={logout}
            eventKey={1}
          />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

ClientNavigationBar.propTypes = {
  changePageToHome: React.PropTypes.func.isRequired,
  changePageToProfile: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
  goToAnnouncements: React.PropTypes.func.isRequired,
  goToMovies: React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    changePageToHome() {
      dispatch(push('/home'));
    },

    changePageToProfile: () => {
      dispatch(push('/profile'));
    },

    goToAnnouncements: () => {
      dispatch(push('/announcements'));
    },

    goToMovies: () => {
      dispatch(push('/movies'));
    },

    goToOrders: () => {
      dispatch(push('client/orders'));
    },

    logout: () => {
      dispatch(logout());
    }
  };
}

export default connect(null, mapDispatchToProps)(ClientNavigationBar);