import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';

import {logout} from '../../../actions/account/logoutActions';
import LogoutButton from '../../common/LogoutButton';

const VotesAdminNavigationBar = ({logout, changePageToHome, goToVotings, goToAddVoting, changePageToProfile}) => {
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
          <NavItem eventKey={1} onClick={goToVotings}> Balsavimai </NavItem>
          <NavItem eventKey={2} onClick={goToAddVoting}> Kurti balsavimą </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} onClick={changePageToProfile}>Profilis</NavItem>
          <LogoutButton onLogout={logout} eventKey={1}/>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

VotesAdminNavigationBar.propTypes = {
  changePageToHome: React.PropTypes.func.isRequired,
  changePageToProfile: React.PropTypes.func.isRequired,
  goToVotings: React.PropTypes.func.isRequired,
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

    goToVotings: () => {
      dispatch(push('/votesadmin/votings'));
    },

    goToAddVoting: () => {
      dispatch(push('/votesadmin/addVoting'));
    },

    logout: () => {
      dispatch(logout());
    }
  };
}

export default connect(null, mapDispatchToProps)(VotesAdminNavigationBar);