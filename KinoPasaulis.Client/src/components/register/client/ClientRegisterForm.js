import React from 'react';
import { reduxForm } from 'redux-form';
import { registerClient } from '../../../actions/account/registerActions';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class ClientRegisterForm extends React.Component {
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
        phone
      }
    } = this.props;

    this.props.dispatch(registerClient(
      userName.value,
      email.value,
      password.value,
      confirmPassword.value,
      firstName.value,
      lastName.value,
      phone.value
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
        phone
      }
    } = this.props;

    return (
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

            <FormGroup controlId="phone">
              <ControlLabel>
                Telefonas
              </ControlLabel>
              <FormControl type="text" placeholder="Telefonas" { ...phone } />
            </FormGroup>

            <Button bsStyle="primary" bsSize="large" onClick={this.handleSubmit}>Registruotis</Button>

          </div>
    );
  }
}

ClientRegisterForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
};

const config = { // <----- THIS IS THE IMPORTANT PART!
  form: 'registerClient',                   // a unique name for this form
  fields: [
    'userName',
    'email',
    'password',
    'confirmPassword',
    'firstName',
    'lastName',
    'phone'
  ] // all the fields in your form
};

export default reduxForm(config)(ClientRegisterForm);
