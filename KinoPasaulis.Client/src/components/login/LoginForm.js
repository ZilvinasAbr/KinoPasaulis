import React from 'react';
import { reduxForm } from 'redux-form';
import { login } from '../../actions/account/loginActions';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
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

  handleEnterPress(event) {
    if (event.charCode === 13) {
      this.handleSubmit();
    }
  }

  render() {
    const {
      fields: {
        userName,
        password
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

            <FormGroup controlId="password">
              <ControlLabel>
                Slaptažodis
              </ControlLabel>
              <FormControl
                type="password"
                placeholder="Slaptažodis"
                { ...password }
                onKeyPress={this.handleEnterPress}
              />
            </FormGroup>

            <Button bsStyle="primary" bsSize="large" onClick={this.handleSubmit}>Prisijungti</Button>

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