import React from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { logout } from '../../../actions/account/logoutActions';
import LogoutButton from '../../common/LogoutButton';

const MovieCreatorNavigationBar = ({logout, changePageToHome, goToTaggedMovies, goToJobOffers, changePageToProfile}) => {
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
          <NavItem eventKey={1} onClick={goToTaggedMovies}> Veikla </NavItem>
          <NavItem eventKey={2} onClick={goToJobOffers}> Darbo skelbimai </NavItem>
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

MovieCreatorNavigationBar.propTypes = {
  changePageToHome: React.PropTypes.func.isRequired,
  goToTaggedMovies: React.PropTypes.func.isRequired,
  changePageToProfile: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    changePageToHome() {
      dispatch(push('/home'));
    },

    changePageToProfile: () => {
      dispatch(push('/profile'));
    },

    goToTaggedMovies: () => {
      dispatch(push('/moviecreator/taggedMovies'));
    },

    goToJobOffers: () => {
      dispatch(push('/moviecreator/jobOffers'));
    },

    logout: () => {
      dispatch(logout());
    }
  };
}

export default connect(null, mapDispatchToProps)(MovieCreatorNavigationBar);