import React from 'react';
import { reduxForm } from 'redux-form';
import { updateAuditorium } from '../../../actions/theather/auditoriumActions';
import { Button, FormControl, Form, FormGroup, Row } from 'react-bootstrap';

class UpdateAuditoriumForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const {fields: {title, seats} } = this.props;
    this.props.dispatch(updateAuditorium(this.props.auditorium.id, title.value, seats.value));
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

UpdateAuditoriumForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
};

const config = {
  form: 'updateAuditorium',
  fields: ['id', 'title', 'seats']
};

export default reduxForm(config)(UpdateAuditoriumForm);