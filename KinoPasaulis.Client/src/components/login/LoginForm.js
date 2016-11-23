import React from 'react';
import { reduxForm } from 'redux-form';
import { login } from '../../actions/loginActions';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const {
      fields: {
        userName,
        password
      }
    } = this.props;

    this.props.dispatch(login(
      userName.value,
      password.value
    ));
  }

  render() {
    const {
      fields: {
        userName,
        password
      }
    } = this.props;

    return (
      <div>
        <div className="container col-md-4 col-md-offset-4">
          <h1> Prisijungimas </h1>
          <hr />
          <div className="row">

            <FormGroup controlId="userName">
              <ControlLabel>
                Vartotojo vardas
              </ControlLabel>
              <FormControl type="text" placeholder="Vartotojo vardas" { ...userName } />
            </FormGroup>

            <FormGroup controlId="password">
              <ControlLabel>
                Slaptažodis
              </ControlLabel>
              <FormControl type="password" placeholder="Slaptažodis" { ...password } />
            </FormGroup>

            <Button bsStyle="primary" bsSize="large" onClick={this.handleSubmit}>Prisijungti</Button>

          </div>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
};

const config = { // <----- THIS IS THE IMPORTANT PART!
  form: 'login',                   // a unique name for this form
  fields: [
    'userName',
    'password'
  ] // all the fields in your form
};

export default reduxForm(config)(LoginForm);