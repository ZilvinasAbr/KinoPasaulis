import React from 'react';
import { reduxForm } from 'redux-form';
import { Button, FormControl, Form, FormGroup, Row, Col, Well } from 'react-bootstrap';
import { addEvent } from '../../../../actions/theather/eventActions';
import { DateRangePicker } from 'react-dates';
import TagsInput from 'react-tagsinput'
import moment from 'moment';
import Autosuggest from 'react-autosuggest';

import 'react-dates/css/variables.scss';
import 'react-tagsinput/react-tagsinput.css'
import 'react-dates/css/styles.scss';
import './autosuggest.scss';

const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSuggestions = (value, movies) => {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return movies.filter(movie => regex.test(movie.title));
};

const getSuggestionValue = suggestion => suggestion.title;

const renderSuggestion = suggestion => (
  <span>{suggestion.title}</span>
);


class AddEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      auditoriumIds: [],
      hover: 'nothovered',
      focusedInput: null,
      startDate: null,
      endDate: null,
      showTimes: [],
      value: '',
      suggestions: getSuggestions(''),
      movieId: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }
  onChange(event, { newValue }){
    const escapedValue = escapeRegexCharacters(newValue.trim());
    const regex = new RegExp('^' + escapedValue, 'i');

    let movies = this.props.movies.filter(movie => regex.test(movie.title));
    if(movies.length == 1)
    {
      this.setState({
        movieId: movies[0].id
      });
    }
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested ({ value }) {
    this.setState({
      suggestions: getSuggestions(value, this.props.movies)
    });
  };

  onSuggestionsClearRequested(){
    this.setState({
      suggestions: []
    });
  };

  handleSubmit() {
    moment().toDate();
    let auditoriums = this.state.auditoriumIds;
    let showTimes = this.state.showTimes;
    let startDate = this.state.startDate.format("YYYY-MM-DD");
    let endDate = this.state.endDate.format("YYYY-MM-DD");
    let movieId = this.state.movieId;
    this.props.dispatch(addEvent(movieId, showTimes, startDate, endDate, auditoriums, movieId));
  }

  handleChange(tags) {
    this.setState({showTimes: tags})
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

  onDatesChange({ startDate, endDate }) {
    console.log(startDate);
    console.log(endDate);
    this.setState({ startDate: startDate, endDate: endDate });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    const {fields: {title, seats} } = this.props;
    const { focusedInput, startDate, endDate } = this.state;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Įveskite filmą',
      value,
      onChange: this.onChange
    };
    return (
      <div>
        <Form>
          <h3> Pasirinkite norimas auditorijas </h3>
          <Row> {this.renderAuditoriums()} </Row>
          <Row>
            <h3> Pasirinkite norima rodymo laikotarpi </h3>
            <FormGroup>
              <DateRangePicker
                {...this.props}
                onDatesChange={this.onDatesChange}
                onFocusChange={this.onFocusChange}
                focusedInput={focusedInput}
                startDate={startDate}
                endDate={endDate}
              />
            </FormGroup>
          </Row>
          <h3> Pasirinkite filma </h3>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          <Row>
            <h3> Pasirinkite seansų laikus </h3>
            <TagsInput value={this.state.showTimes} onChange={this.handleChange} />
          </Row>
          <FormGroup>
            <Button bsStyle="primary" onClick={this.handleSubmit}> Patvirtinti </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

AddEventForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
};

const config = { // <----- THIS IS THE IMPORTANT PART!
  form: 'addEvent',                   // a unique name for this form
  fields: [] // all the fields in your form
};

export default reduxForm(config)(AddEventForm);