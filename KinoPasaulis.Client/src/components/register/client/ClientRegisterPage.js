import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoggedOfNavigationBar from '../../common/LoggedOfNavigationBar';
import ClientRegisterForm from './ClientRegisterForm';
import ErrorMessage from '../ErrorMessage';
import { deleteErrorMessage } from '../../../actionCreators/registerLoginError';

class ClientRegisterPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.deleteErrorMessage();
  }

  render() {
    return (
      <div>
        <LoggedOfNavigationBar
          changePageToLanding={this.props.changePageToLanding}
          changePageToLogin={this.props.changePageToLogin}
          changePageToRegister={this.props.changePageToRegister} />
        <div>
          <div className="container col-md-4 col-md-offset-4">
            <h1> Vartotojo registracija </h1>
            <hr />
            {this.props.message && <ErrorMessage message={this.props.message} />}
            <ClientRegisterForm />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.registerLoginError.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changePageToLanding() {
      dispatch(push('/'));
    },
    changePageToLogin() {
      dispatch(push('/login'));
    },
    changePageToRegister() {
      dispatch(push('/register'));
    },
    deleteErrorMessage() {
      dispatch(deleteErrorMessage());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientRegisterPage);