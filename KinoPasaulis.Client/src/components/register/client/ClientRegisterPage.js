import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoggedOfNavigationBar from '../../common/LoggedOfNavigationBar';
import ClientRegisterForm from './ClientRegisterForm';
import ErrorMessage from '../ErrorMessage';

const ClientRegisterPage = (props) => {
  return (
    <div>
      <LoggedOfNavigationBar
        changePageToLanding={props.changePageToLanding}
        changePageToLogin={props.changePageToLogin}
        changePageToRegister={props.changePageToRegister} />
      <div>
        <div className="container col-md-4 col-md-offset-4">
          <h1> Vartotojo registracija </h1>
          <hr />
          {props.message && <ErrorMessage message={props.message} />}
          <ClientRegisterForm />
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    message: state.registerLoginError.message
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

export default connect(mapStateToProps, mapDispatchToProps)(ClientRegisterPage);