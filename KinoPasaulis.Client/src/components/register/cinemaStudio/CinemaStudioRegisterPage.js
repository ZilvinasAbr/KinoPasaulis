import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoggedOfNavigationBar from '../../common/LoggedOfNavigationBar';
import CinemaStudioRegisterForm from './CinemaStudioRegisterForm';

const CinemaStudioRegisterPage = (props) => {
  return (
    <div>
      <LoggedOfNavigationBar
        changePageToLanding={props.changePageToLanding}
        changePageToLogin={props.changePageToLogin}
        changePageToRegister={props.changePageToRegister} />
      <CinemaStudioRegisterForm />
    </div>
  );
};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    changePageToLanding: () => {
      dispatch(push('/'));
    },
    changePageToLogin: () => {
      dispatch(push('/login'));
    },
    changePageToRegister: () => {
      dispatch(push('/register'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CinemaStudioRegisterPage);