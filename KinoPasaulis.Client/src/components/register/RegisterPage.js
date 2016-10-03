import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  changeViewToUserRegister,
  changeViewToTheaterRegister,
  changeViewToCinemaStudioRegister
} from '../../actionCreators/registerActionCreators';
import Main from './Main';
import UserRegister from './UserRegister';
import TheaterRegister from './TheaterRegister';
import CinemaStudioRegister from './CinemaStudioRegister';
import LoggedOfNavigationBar from '../common/LoggedOfNavigationBar';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
  }

  renderView() {
    const view = this.props.view;
    switch(view) {
      case 'main':
        return <Main
          changeViewToUser={this.props.changeViewToUserRegister}
          changeViewToTheater={this.props.changeViewToTheaterRegister}
          changeViewToCinemaStudio={this.props.changeViewToCinemaStudioRegister}
        />;
      case 'user':
        return <UserRegister />;
      case 'theater':
        return <TheaterRegister />;
      case 'cinemaStudio':
        return <CinemaStudioRegister />;
      default:
        return <div>Error</div>;
    }
  }

  render() {
    return (
      <div>
        <LoggedOfNavigationBar changePageToLanding={this.props.changePageToLanding} changePageToLogin={this.props.changePageToLogin} changePageToRegister={this.props.changePageToRegister} />
        {this.renderView()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    view: state.registerPage.view
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeViewToUserRegister: () => {
      dispatch(changeViewToUserRegister());
    },
    changeViewToTheaterRegister: () => {
      dispatch(changeViewToTheaterRegister());
    },
    changeViewToCinemaStudioRegister: () => {
      dispatch(changeViewToCinemaStudioRegister());
    },

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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);