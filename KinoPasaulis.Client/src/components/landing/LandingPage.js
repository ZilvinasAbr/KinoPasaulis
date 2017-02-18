import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoggedOfNavigationBar from '../common/LoggedOfNavigationBar';
import TypescriptWorks from './TypescriptWorks.tsx';

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
        <img width="100%" height="100%" src="http://i.imgur.com/HJpcAuU.png"></img>
        <TypescriptWorks title='Props also work!' />
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
      dispatch(push('/login'));
    },

    changePageToRegister: () => {
      dispatch(push('/register'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);