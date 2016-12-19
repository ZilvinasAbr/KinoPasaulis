import React from 'react';
import { connect } from 'react-redux';
import
{
  Row,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';
import DatePicker from 'react-bootstrap-date-picker';
import axios from 'axios';

import {
  fetchMovieCreators
} from '../../../../cinemaStudio/actions/movieActions';
import {
    addVoting
} from '../../../../actions/votesAdmin/votingActions';
import MovieCreatorsTable from './MovieCreatorsTable';
import MovieCreatorAutosuggest from './MovieCreatorAutosuggest';

class AddVotingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      startDate: null,
      endDate: null,
      selectedMovieCreators: [],
      modalIsOpen: false,
      focusedInput: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleOnTitleChange = this.handleOnTitleChange.bind(this);
    this.handleOnStartDateChange = this.handleOnStartDateChange.bind(this);
    this.handleOnEndDateChange = this.handleOnEndDateChange.bind(this);
    this.selectMovieCreator = this.selectMovieCreator.bind(this);
    this.removeMovieCreator = this.removeMovieCreator.bind(this);
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  /*fetchMovieCreators() {
      axios.get('/api/movieCreator/')
          .then(response => {
            console.log(response.data);
            this.setState({
              movieCreators: response.data
            })
          })
          .catch(error => {
            console.log(error);
          })
  }*/

  componentDidMount() {
    this.props.dispatch(fetchMovieCreators());
  }

  handleOnTitleChange(e) {
    this.setState({
      title: e.target.value
    })
  }
  handleOnStartDateChange(value, formattedValue) {
    this.setState({
      releaseDate: value
    })
  }
  handleOnEndDateChange(e) {
    this.setState({
      budget: e.target.value
    })
  }

  onDatesChange({ startDate, endDate }) {
    console.log(startDate);
    console.log(endDate);
    this.setState({ startDate: startDate, endDate: endDate });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  selectMovieCreator(suggestion) {
    this.setState({
      selectedMovieCreators: [...this.state.selectedMovieCreators, {
        id: suggestion.id,
        firstName: suggestion.firstName,
        lastName: suggestion.lastName
      }]
    });
  }
  removeMovieCreator(index) {
    this.setState({
      selectedMovieCreators: this.state.selectedMovieCreators.filter((creator, index2) => index2 !== index)
    });
  }
  handleSubmit() {
    if(this.state.selectedMovieCreators.length < 2)
    {
      alert("Pasirinkite bent 2 kandidatus!");
    }
    else {
      this.props.dispatch(
          addVoting(
              this.state.title,
              this.state.startDate,
              this.state.endDate,
              this.state.selectedMovieCreators
          )
      );
    }
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    return (
      <div className="row">
        <FormGroup controlId="title">
          <ControlLabel>
            Pavadinimas
          </ControlLabel>
          <FormControl
            type="text"
            placeholder="Pavadinimas"
            value={this.state.title}
            onChange={this.handleOnTitleChange}
          />
        </FormGroup>

          <h3> Pasirinkite balsavimo laikotarpį </h3>
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

        <FormGroup>
          <ControlLabel>
            Pasirinkti kandidatai
          </ControlLabel>
          <MovieCreatorAutosuggest
            modalIsOpen={this.state.modalIsOpen2}
            onAfterOpen={this.onAfterOpen2}
            closeModal={this.closeModal2}
            selectMovieCreator={this.selectMovieCreator}
            movieCreators={this.props.movieCreators}
            selectedMovieCreators={this.state.selectedMovieCreators}
          />
          <MovieCreatorsTable
            movieCreators={this.state.selectedMovieCreators}
            removeMovieCreator={this.removeMovieCreator}
          />
        </FormGroup>

        <Button bsStyle="primary" onClick={this.handleSubmit}>
          Kurti balsavimą
        </Button>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movieCreators: state.cinemaStudioPage.movieCreators
  };
}

export default connect(mapStateToProps)(AddVotingForm);