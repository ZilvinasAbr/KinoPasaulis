import React from 'react';
import { reduxForm } from 'redux-form';
import { registerTheather } from '../../../actions/account/registerActions';
import { Button, Form, FormGroup, Col, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';

class TheatherRegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const {fields: {username, password, repeat, email, title, city, address, phone} } = this.props;
    //
    this.props.dispatch(registerTheather(username.value, password.value, repeat.value, city.value, address.value, email.value, phone.value, title.value));
  }

  render() {
    const {fields: {username, password, repeat, email, title, city, address, phone} } = this.props;

    return (
      <div>
        <div className="container col-md-4 col-md-offset-4">
          <h1> Kino teatro registracija </h1>
          <hr />
          <div className="row">

            <FormGroup controlId="username">
              <ControlLabel>
                Vartotojo vardas
              </ControlLabel>
              <FormControl type="text" placeholder="Vartotojo vardas" { ...username } />
            </FormGroup>

            <FormGroup controlId="username">
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
              <FormControl type="password" placeholder="Pakartoti slaptažodį" { ...repeat } />
            </FormGroup>

            <FormGroup controlId="password">
              <ControlLabel>
                Pavadinimas
              </ControlLabel>
              <FormControl type="text" placeholder="Pavadinimas" { ...title } />
            </FormGroup>

            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Miestas</ControlLabel>
              <FormControl componentClass="select" placeholder="select" { ...city }>
                <option hidden >Miestas</option>
                <option value="Vilnius">Vilnius</option>
                <option value="Kaunas">Kaunas</option>
                <option value="Šiauliai">Šiauliai</option>
                <option value="Panevežys">Panevežys</option>
                <option value="Klaipeda">Klaipeda</option>
              </FormControl>
            </FormGroup>

            <FormGroup controlId="password">
              <ControlLabel>
                Adresas
              </ControlLabel>
              <FormControl type="text" placeholder="Adresas" { ...address } />
            </FormGroup>

            <FormGroup controlId="password">
              <ControlLabel>
                Telefonas
              </ControlLabel>
              <FormControl type="text" placeholder="Telefonas" { ...phone } />
            </FormGroup>

            <Button bsStyle="primary" bsSize="large" onClick={this.handleSubmit}> Registruotis </Button>

          </div>
        </div>
      </div>
    );
  }
}

TheatherRegisterForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
};

const config = { // <----- THIS IS THE IMPORTANT PART!
  form: 'registerTheather',                   // a unique name for this form
  fields: ['username', 'password', 'email', 'repeat', 'title', 'city', 'address', 'phone'] // all the fields in your form
};

export default reduxForm(config)(TheatherRegisterForm);