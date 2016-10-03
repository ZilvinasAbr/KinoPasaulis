import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoggedOfNavigationBar from '../common/LoggedOfNavigationBar';
import { Button } from 'react-bootstrap';

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
            <Button bsStyle="primary">Vartotojo registracija</Button>
            <Button bsStyle="primary">Kino teatro registracija</Button>
            <Button bsStyle="primary" onClick={this.props.changePageToCinemaStudio}>Kino studijos registracija</Button>
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