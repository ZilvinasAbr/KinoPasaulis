import React from 'react';
import { connect } from 'react-redux';
import {
  changeViewToUserRegister,
  changeViewToTheaterRegister,
  changeViewToCinemaStudioRegister
} from '../../actionCreators/registerActionCreators';
import Main from './Main';
import UserRegister from './UserRegister';
import TheaterRegister from './TheaterRegister';
import CinemaStudioRegister from './CinemaStudioRegister';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
  }

  renderView() {
    const view = this.props.view;
    switch(view) {
      case 'main':
        return <Main />;
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
    return this.renderView();
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);