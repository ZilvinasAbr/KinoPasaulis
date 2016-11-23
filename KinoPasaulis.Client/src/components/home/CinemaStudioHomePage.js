import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { logout } from '../../actions/account/logoutActions';
import CinemaStudioNavigationBar from './cinemaStudio/CinemaStudioNavigationBar';

class CinemaStudioPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CinemaStudioNavigationBar
          changePageToHome={this.props.changePageToHome}
          logout={this.props.logout}
        />
        <h1> Cinema Studio Home Page </h1>
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
    changePageToHome: () => {
      dispatch(push('/home'));
    },

    logout: () => {
      dispatch(logout());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CinemaStudioPage);