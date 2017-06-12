import React from 'react';
import { reduxForm } from 'redux-form';
import { addAuditorium } from '../../../actions/theather/auditoriumActions';
import { Button, FormControl, Form, FormGroup, Row } from 'react-bootstrap';

class AddAuditoriumForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const {fields: {title, seats} } = this.props;

    this.props.dispatch(addAuditorium(title.value, seats.value));
  }

  render() {
    const {fields: {title, seats} } = this.props;

    return (
      <div>
        <Form>
            <FormGroup>
              <FormControl type="text" placeholder="Auditorijos pavadinimas" { ...title } />
            </FormGroup>

            <FormGroup>
              <FormControl type="number" placeholder="Vietų skaičius" { ...seats } />
            </FormGroup>

            <FormGroup>
              <Button onClick={this.handleSubmit}> Patvirtinti </Button>
            </FormGroup>
        </Form>
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