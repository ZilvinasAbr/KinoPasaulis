import React from 'react';
import { reduxForm } from 'redux-form';
import { registerTheather } from '../../../actions/theather/auditoriumActions';
import { Button, FormControl } from 'react-bootstrap';

class AddAuditoriumForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const {fields: {title, seats} } = this.props;
    //
    this.props.dispatch(registerTheather(username.value, password.value, repeat.value, city.value, address.value, email.value, phone.value, title.value));
  }

  render() {
    const {fields: {title, seats} } = this.props;

    return (
      <div>
        <FormControl type="text" placeholder="Auditorijos pavadinimas" />
        <FormControl type="number" placeholder="Vietu skaicius" />
        <Button> Patvirtinti </Button>
      </div>
    );
  }
}

AddAuditoriumForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
};

const config = { // <----- THIS IS THE IMPORTANT PART!
  form: 'addAuditorium',                   // a unique name for this form
  fields: ['title', 'seats'] // all the fields in your form
};

export default reduxForm(config)(AddAuditoriumForm);