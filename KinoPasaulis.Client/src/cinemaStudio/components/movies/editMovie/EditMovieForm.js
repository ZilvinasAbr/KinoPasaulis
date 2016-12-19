import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import
{
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

import {
  editMovie,
  fetchMovieCreators
} from '../../../actions/movieActions';
import VideosTable from '../addMovie/VideosTable';
import SelectVideoModal from '../addMovie/SelectVideoModal';
import MovieCreatorsTable from '../addMovie/MovieCreatorsTable';
import MovieCreatorAutosuggest from '../addMovie/MovieCreatorAutosuggest';

class EditMovieForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      releaseDate: '',
      hours: '',
      minutes: '',
      budget: '',
      description: '',
      gross: '',
      language: '',
      ageRequirement: '',
      videos: [],
      selectedMovieCreators: [],
      modalIsOpen: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleOnTitleChange = this.handleOnTitleChange.bind(this);
    this.handleOnReleaseDateChange = this.handleOnReleaseDateChange.bind(this);
    this.handleOnBudgetChange = this.handleOnBudgetChange.bind(this);
    this.handleOnDescriptionChange = this.handleOnDescriptionChange.bind(this);
    this.handleOnGrossChange = this.handleOnGrossChange.bind(this);
    this.handleOnLanguageChange = this.handleOnLanguageChange.bind(this);
    this.handleOnAgeRequirementChange = this.handleOnAgeRequirementChange.bind(this);
    this.handleOnMinutesChange = this.handleOnMinutesChange.bind(this);
    this.handleOnHoursChange = this.handleOnHoursChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
    this.removeVideo = this.removeVideo.bind(this);
    this.selectMovieCreator = this.selectMovieCreator.bind(this);
    this.removeMovieCreator = this.removeMovieCreator.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/cinemaStudio/movie/${this.props.movieId}`)
      .then(response => {
        console.log(response.data);
        const responseMovie = response.data;
        this.setState({
          title: responseMovie.title,
          releaseDate: responseMovie.releaseDate,
          hours: responseMovie.hours,
          minutes: responseMovie.minutes,
          budget: responseMovie.budget,
          description: responseMovie.description,
          gross: responseMovie.gross,
          language: responseMovie.language,
          ageRequirement: responseMovie.ageRequirement,
          droppedFiles: [],
          videos: responseMovie.videos,
          selectedMovieCreators: responseMovie.movieCreators
        });
      })
      .catch(error => {
        console.log(error);
      });
    this.props.dispatch(fetchMovieCreators());
  }

  handleOnTitleChange(e) {
    this.setState({
      title: e.target.value
    })
  }
  handleOnReleaseDateChange(value, formattedValue) {
    this.setState({
      releaseDate: value
    })
  }
  handleOnBudgetChange(e) {
    this.setState({
      budget: e.target.value
    })
  }
  handleOnDescriptionChange(e) {
    this.setState({
      description: e.target.value
    })
  }
  handleOnGrossChange(e) {
    this.setState({
      gross: e.target.value
    })
  }
  handleOnLanguageChange(e) {
    this.setState({
      language: e.target.value
    })
  }
  handleOnAgeRequirementChange(e) {
    this.setState({
      ageRequirement: e.target.value
    })
  }
  handleOnMinutesChange(e) {
    this.setState({
      minutes: e.target.value
    });
  }
  handleOnHoursChange(e) {
    this.setState({
      hours: e.target.value
    });
  }
  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }
  afterOpenModal() {
  }
  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }
  selectVideo(title, url, description) {
    this.setState({
      videos: [...this.state.videos, {
        title, url, description
      }]
    });
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
  removeVideo(index) {
    this.setState({
      videos: this.state.videos.filter((video, index2) => index2 !== index)
    });
  }
  removeMovieCreator(index) {
    this.setState({
      selectedMovieCreators: this.state.selectedMovieCreators.filter((creator, index2) => index2 !== index)
    });
  }
  handleSubmit() {
    this.props.dispatch(
      editMovie(
        this.props.movieId,
        this.state.title,
        this.state.hours,
        this.state.minutes,
        this.state.releaseDate,
        this.state.budget,
        this.state.description,
        this.state.gross,
        this.state.language,
        this.state.ageRequirement,
        this.state.videos,
        this.state.selectedMovieCreators
      )
    );
  }

  render() {
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

        <FormGroup>
          <ControlLabel>
            Filmo trukmė
          </ControlLabel>
          <FormControl
            type="number"
            placeholder="Valandos"
            value={this.state.hours}
            onChange={this.handleOnHoursChange}
          />
          <FormControl
            type="number"
            placeholder="Minutės"
            value={this.state.minutes}
            onChange={this.handleOnMinutesChange}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Išleidimo data</ControlLabel>
          <DatePicker
            id="releaseDatePicker"
            value={this.state.releaseDate}
            onChange={this.handleOnReleaseDateChange}
          />
        </FormGroup>

        <FormGroup controlId="budget">
          <ControlLabel>
            Pastatymo kaina
          </ControlLabel>
          <FormControl
            type="number"
            placeholder="Pastatymo kaina"
            value={this.state.budget}
            onChange={this.handleOnBudgetChange}
          />
        </FormGroup>

        <FormGroup controlId="description">
          <ControlLabel>
            Aprašymas
          </ControlLabel>
          <FormControl
            type="text"
            placeholder="Aprašymas"
            value={this.state.description}
            onChange={this.handleOnDescriptionChange}
          />
        </FormGroup>

        <FormGroup controlId="gross">
          <ControlLabel>
            Pajamos
          </ControlLabel>
          <FormControl
            type="number"
            placeholder="Pajamos"
            value={this.state.gross}
            onChange={this.handleOnGrossChange}
          />
        </FormGroup>

        <FormGroup controlId="language">
          <ControlLabel>
            Kalba
          </ControlLabel>
          <FormControl
            type="text"
            placeholder="Kalba"
            value={this.state.language}
            onChange={this.handleOnLanguageChange}
          />
        </FormGroup>

        <FormGroup controlId="ageRequirement">
          <ControlLabel>
            Amžiaus cenzas
          </ControlLabel>
          <FormControl
            type="text"
            placeholder="Amžiaus cenzas"
            value={this.state.ageRequirement}
            onChange={this.handleOnAgeRequirementChange}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>
            Pasirinkti video
          </ControlLabel>
          <VideosTable
            videos={this.state.videos}
            removeVideo={this.removeVideo}
          />
          <Button bsStyle="success" onClick={this.openModal}>
            Pridėti video
          </Button>
        </FormGroup>

        <FormGroup>
          <ControlLabel>
            Pasirinkti filmų kūrėjai
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
          Redaguoti filmą
        </Button>

        <SelectVideoModal
          modalIsOpen={this.state.modalIsOpen}
          onAfterOpen={this.onAfterOpen}
          closeModal={this.closeModal}
          selectVideo={this.selectVideo}
        />
      </div>
    );
  }
}

EditMovieForm.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  movieCreators: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  movieId: React.PropTypes.number.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    movieCreators: state.cinemaStudioPage.movieCreators
  };
}

export default connect(mapStateToProps)(EditMovieForm);