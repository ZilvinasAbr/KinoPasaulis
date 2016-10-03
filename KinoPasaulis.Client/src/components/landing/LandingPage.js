import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoggedOfNavigationBar from '../common/LoggedOfNavigationBar';

class LandingPage extends React.Component {
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);