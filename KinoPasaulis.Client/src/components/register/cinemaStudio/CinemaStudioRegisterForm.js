import React from 'react';
import { reduxForm } from 'redux-form';
import { registerCinemaStudio } from '../../../actions/account/registerActions';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class CinemaStudioRegisterForm extends React.Component {
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
        name,
        city,
        country,
        address,
        phone
      }
    } = this.props;

    this.props.dispatch(registerCinemaStudio(
      userName.value,
      email.value,
      password.value,
      confirmPassword.value,
      name.value,
      city.value,
      country.value,
      address.value,
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
        name,
        city,
        country,
        address,
        phone
      }
    } = this.props;

    return (
      <div>
        <div className="container col-md-4 col-md-offset-4">
          <h1> Kino studijos registracija </h1>
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

            <FormGroup controlId="name">
              <ControlLabel>
                Kino studijos pavadinimas
              </ControlLabel>
              <FormControl type="text" placeholder="Kino studijos pavadinimas" { ...name } />
            </FormGroup>

            <FormGroup controlId="city">
              <ControlLabel>
                Miestas
              </ControlLabel>
              <FormControl type="text" placeholder="Miestas" { ...city } />
            </FormGroup>

            <FormGroup controlId="country">
              <ControlLabel>
                Valstybė
              </ControlLabel>
              <FormControl type="text" placeholder="Valstybė" { ...country } />
            </FormGroup>

            <FormGroup controlId="address">
              <ControlLabel>
                Adresas
              </ControlLabel>
              <FormControl type="text" placeholder="Adresas" { ...address } />
            </FormGroup>

            <FormGroup controlId="phone">
              <ControlLabel>
                Telefonas
              </ControlLabel>
              <FormControl type="text" placeholder="Telefonas" { ...phone } />
            </FormGroup>

            <Button bsStyle="primary" bsSize="large" onClick={this.handleSubmit}>Registruotis</Button>

          </div>
        </div>
      </div>
    );
  }
}

CinemaStudioRegisterForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
};

const config = { // <----- THIS IS THE IMPORTANT PART!
  form: 'registerCinemaStudio',                   // a unique name for this form
  fields: [
    'userName',
    'email',
    'password',
    'confirmPassword',
    'name',
    'city',
    'country',
    'address',
    'phone'
  ] // all the fields in your form
};

export default reduxForm(config)(CinemaStudioRegisterForm);