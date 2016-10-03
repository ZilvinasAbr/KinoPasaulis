import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoggedOfNavigationBar from '../../common/LoggedOfNavigationBar';
import { Button } from 'react-bootstrap';

const CinemaStudioRegisterPage = (props) => {
  return (
    <div>
      <LoggedOfNavigationBar changePageToLanding={props.changePageToLanding} changePageToLogin={props.changePageToLogin} changePageToRegister={props.changePageToRegister} />
      <div className="container">
        <h1>Kino studijos registracija</h1>
        <hr />
        <div className="row">
          <div className="form-group">
            <input type="text" placeholder="Elektroninis paštas" className="form-control" name="Email" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Slaptažodis" className="form-control" name="Password" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Pakartoti slaptažodį" className="form-control" name="Repeat" />
          </div>
          <Button bsStyle="primary">Registruotis</Button>
        </div>
      </div>
    </div>
  );
};

CinemaStudioRegisterPage.propTypes = {

};

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
      dispatch(push('login'));
    },
    changePageToRegister: () => {
      dispatch(push('register'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CinemaStudioRegisterPage);