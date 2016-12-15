import React from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { logout } from '../../actions/account/logoutActions';
import LogoutButton from '../../components/common/LogoutButton';

const CinemaStudioNavigationBar = ({logout, changePageToHome, changePageToMovies, changePageToProfile}) => {
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
          <NavItem eventKey={1} onClick={changePageToMovies}>Filmai</NavItem>
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

CinemaStudioNavigationBar.propTypes = {
  changePageToHome: React.PropTypes.func.isRequired,
  changePageToMovies: React.PropTypes.func.isRequired,
  changePageToProfile: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    changePageToHome() {
      dispatch(push('/home'));
    },

    changePageToMovies: () => {
      dispatch(push('/cinemaStudio/movies'));
    },

    changePageToProfile: () => {
      dispatch(push('/profile'));
    },

    logout: () => {
      dispatch(logout());
    }
  };
}

export default connect(null, mapDispatchToProps)(CinemaStudioNavigationBar);