import React from 'react';
import { reduxForm } from 'redux-form';
import { Button, FormControl, Form, FormGroup, Row, Col, Well } from 'react-bootstrap';

class AddAuditoriumForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      auditoriumIds: [],
      hover: 'nothovered'
    };
  }

  handleSubmit() {
    const {fields: {title, seats} } = this.props;
  }

  addOrRemoveFromAuditoriumList(id, index)
  {
    var idx = this.state.auditoriumIds.indexOf(id);
    if(idx == -1)
    {
      this.state.auditoriumIds.push(id);
      document.getElementById(index).className = 'well taken';
    }
    else
    {
      document.getElementById(index).className = 'well hovered';
      this.state.auditoriumIds.splice(idx, 1);
    }
  }

  hover(index)
  {
    let classValue = document.getElementById(index).className;
    if(classValue.indexOf('taken') == -1)
    {
      document.getElementById(index).className+= ' hovered';
    }
  }

  unHover(index)
  {
    let classValue=document.getElementById(index).className;
    if(classValue.indexOf('taken') == -1) {
      document.getElementById(index).className = classValue.substring(0, classValue.length - 8);
    }
  }

  renderAuditoriums() {
    let auditoriums = this.props.auditoriums;

    return auditoriums.map((a, index) => {
      return <Col md={3} key={index}>
        <div>
          <Well id={index} className={this.state.hover} onMouseEnter={this.hover.bind(this, index)} onClick={this.addOrRemoveFromAuditoriumList.bind(this, a.id, index)} onMouseLeave={this.unHover.bind(this, index)}>
            <p> Pavadinimas: {a.name} </p>
            <p> Vietų skaičius: {a.seats} </p>
          </Well>
        </div>
      </Col>
    });
  }

  render() {
    const {fields: {title, seats} } = this.props;

    return (
      <div>
        <Form>
          <div> {this.renderAuditoriums()} </div>
          <FormGroup>
            <FormControl type="text" placeholder="Auditorijos pavadinimas" { ...title } />
          </FormGroup>

          <FormGroup>
            <FormControl type="number" placeholder="Vietu skaicius" { ...seats } />
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