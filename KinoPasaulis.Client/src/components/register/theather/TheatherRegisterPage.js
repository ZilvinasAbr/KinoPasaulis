import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoggedOfNavigationBar from '../../common/LoggedOfNavigationBar';
import TheatherRegisterForm from './TheatherRegisterForm';
import ErrorMessage from '../ErrorMessage';


class TheaterRegisterPage extends React.Component {
  constructor(props) {
    super(props);
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
              <h1> Kino teatro registracija </h1>
              <hr />
              {this.props.message && <ErrorMessage message={this.props.message} />}
              <TheatherRegisterForm  />
            </div>
          </div>
        </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(TheaterRegisterPage);
