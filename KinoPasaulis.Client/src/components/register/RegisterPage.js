import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoggedOfNavigationBar from '../common/LoggedOfNavigationBar';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <LoggedOfNavigationBar changePageToLanding={this.props.changePageToLanding} changePageToLogin={this.props.changePageToLogin} changePageToRegister={this.props.changePageToRegister} />
        <div className="container">
          <div className="row">
            <button type="button" className="btn btn-primary">Vartotojo registracija</button>
            <button type="button" className="btn btn-primary">Kino teatro registracija</button>
            <button type="button" className="btn btn-primary" onClick={this.props.changePageToCinemaStudio}>Kino studijos registracija</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePageToLanding: () => {
      dispatch(push('/'));
    },
    changePageToLogin: () => {
      dispatch(push('login'));
    },
    changePageToRegister: () => {
      dispatch(push('register'));
    },
    changePageToCinemaStudio: () => {
      dispatch(push('register/cinemastudio'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);