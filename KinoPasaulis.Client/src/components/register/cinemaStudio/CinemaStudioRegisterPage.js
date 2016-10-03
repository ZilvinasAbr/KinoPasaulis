import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoggedOfNavigationBar from '../../common/LoggedOfNavigationBar';
import { Button, Form, FormGroup, Col, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';

const CinemaStudioRegisterPage = (props) => {
  return (
    <div>
      <LoggedOfNavigationBar changePageToLanding={props.changePageToLanding} changePageToLogin={props.changePageToLogin} changePageToRegister={props.changePageToRegister} />
      <Form horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Elektroninis paštas
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="Elektroninis paštas" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Slaptažodis
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="Slaptažodis" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Pakartoti slaptažodį
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="Pakartoti slaptažodį" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button>
              Registruotis
            </Button>
          </Col>
        </FormGroup>
      </Form>
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
      dispatch(push('/login'));
    },
    changePageToRegister: () => {
      dispatch(push('/register'));
    },
    changePageToSame: () => {
      dispatch(push('/register/cinemastudio'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CinemaStudioRegisterPage);