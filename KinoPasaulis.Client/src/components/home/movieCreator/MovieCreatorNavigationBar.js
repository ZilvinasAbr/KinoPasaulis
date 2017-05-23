import React from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { logout } from '../../../actions/account/logoutActions';
import LogoutButton from '../../common/LogoutButton';

const MovieCreatorNavigationBar = ({logout, changePageToHome, goToTaggedMovies, goToJobOffers, goToAwards}) => {
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
          <NavItem eventKey={3} onClick={goToAwards}> Apdovanojimai </NavItem>
        </Nav>
        <Nav pullRight>
          <LogoutButton onLogout={logout} eventKey={1} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

MovieCreatorNavigationBar.propTypes = {
  changePageToHome: React.PropTypes.func.isRequired,
  goToTaggedMovies: React.PropTypes.func.isRequired,
  goToJobOffers: React.PropTypes.func.isRequired,
  goToAwards: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    changePageToHome() {
      dispatch(push('/home'));
    },

    goToTaggedMovies: () => {
      dispatch(push('/moviecreator/taggedMovies'));
    },

    goToJobOffers: () => {
      dispatch(push('/moviecreator/jobOffers'));
    },

    goToAwards: () => {
      dispatch(push('/moviecreator/awards'));
    },

    logout: () => {
      dispatch(logout());
    }
  };
}

export default connect(null, mapDispatchToProps)(MovieCreatorNavigationBar);