import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';
import { registerTheather } from '../../../actions/registerActions';
import LoggedOfNavigationBar from '../../common/LoggedOfNavigationBar';
import TheatherRegisterForm from './TheatherRegisterForm';


class TheaterRegisterPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const {fields: {username, password, confirm} } = this.props;

    return (
        <div>
            <LoggedOfNavigationBar changePageToLanding={this.props.changePageToLanding} changePageToLogin={this.props.changePageToLogin} changePageToRegister={this.props.changePageToRegister} />
            <TheatherRegisterForm  />
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
