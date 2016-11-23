import React from 'react';
import { reduxForm } from 'redux-form';
import { registerCinemaCreator } from '../../../actions/registerActions';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class CinemaCreatorRegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const {
      fields: {
        userName,
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        birthDate,
        description
      }
    } = this.props;

    this.props.dispatch(registerCinemaCreator(
      userName.value,
      email.value,
      password.value,
      confirmPassword.value,
      firstName.value,
      lastName.value,
      birthDate.value,
      description.value
    ));
  }

  render() {
    const {
      fields: {
        userName,
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        birthDate,
        description
      }
    } = this.props;

    return (
      <div>
        <div className="container col-md-4 col-md-offset-4">
          <h1> Kino kūrėjo registracija </h1>
          <hr />
          <div className="row">

            <FormGroup controlId="userName">
              <ControlLabel>
                Vartotojo vardas
              </ControlLabel>
              <FormControl type="text" placeholder="Vartotojo vardas" { ...userName } />
            </FormGroup>

            <FormGroup controlId="email">
              <ControlLabel>
                Elektroninis paštas
              </ControlLabel>
              <FormControl type="email" placeholder="El. paštas" { ...email } />
            </FormGroup>

            <FormGroup controlId="password">
              <ControlLabel>
                Slaptažodis
              </ControlLabel>
              <FormControl type="password" placeholder="Slaptažodis" { ...password } />
            </FormGroup>

            <FormGroup controlId="password">
              <ControlLabel>
                Pakartoti slaptažodį
              </ControlLabel>
              <FormControl type="password" placeholder="Pakartoti slaptažodį" { ...confirmPassword } />
            </FormGroup>

            <FormGroup controlId="firstName">
              <ControlLabel>
                Vardas
              </ControlLabel>
              <FormControl type="text" placeholder="Vardas" { ...firstName } />
            </FormGroup>

            <FormGroup controlId="lastName">
              <ControlLabel>
                Pavardė
              </ControlLabel>
              <FormControl type="text" placeholder="Pavardė" { ...lastName } />
            </FormGroup>

            <FormGroup controlId="birthDate">
              <ControlLabel>
                Gimimo data
              </ControlLabel>
              <FormControl type="text" placeholder="Gimimo data" { ...birthDate } />
            </FormGroup>

            <FormGroup controlId="description">
              <ControlLabel>
                Aprašymas
              </ControlLabel>
              <FormControl type="text" placeholder="Aprašymas" { ...description } />
            </FormGroup>

            <Button bsStyle="primary" bsSize="large" onClick={this.handleSubmit}>Registruotis</Button>

          </div>
        </div>
      </div>
    );
  }
}

CinemaCreatorRegisterForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
};

const config = { // <----- THIS IS THE IMPORTANT PART!
  form: 'registerCinemaCreator',                   // a unique name for this form
  fields: [
    'userName',
    'email',
    'password',
    'confirmPassword',
    'firstName',
    'lastName',
    'birthDate',
    'description'
  ] // all the fields in your form
};

export default reduxForm(config)(CinemaCreatorRegisterForm);