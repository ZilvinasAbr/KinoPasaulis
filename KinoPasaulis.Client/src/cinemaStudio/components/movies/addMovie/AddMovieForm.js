import React from 'react';
import { connect } from 'react-redux';
import
{
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import DatePicker from 'react-bootstrap-date-picker';

import VideosTable from './VideosTable';
import {
  addMovie,
  fetchMovieCreators
} from '../../../actions/movieActions';
import SelectVideoModal from './SelectVideoModal';
import MovieCreatorsTable from './MovieCreatorsTable';
import MovieCreatorAutosuggest from './MovieCreatorAutosuggest';
import SelectedImagesPreviewTable from './SelectedImagesPreviewTable';

class AddMovieForm extends React.Component {
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
      droppedFiles: [],
      imageTitles: [],
      imageDescriptions: [],
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
    this.handleImageTitleChange = this.handleImageTitleChange.bind(this);
    this.handleImageDescriptionChange = this.handleImageDescriptionChange.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
    this.removeVideo = this.removeVideo.bind(this);
    this.removeDroppedImage = this.removeDroppedImage.bind(this);
    this.selectMovieCreator = this.selectMovieCreator.bind(this);
    this.removeMovieCreator = this.removeMovieCreator.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchMovieCreators());
  }

  onImageDrop(files) {
    this.setState({
      droppedFiles: [ ...this.state.droppedFiles, ...files],
      imageTitles: [...this.state.imageTitles, ...files.map(() => '')],
      imageDescriptions: [...this.state.imageDescriptions, ...files.map(() => '')]
    });
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
  handleImageTitleChange(title, index) {
    let imageTitles = this.state.imageTitles.concat();
    imageTitles[index] = title;

    this.setState({
      imageTitles
    });
  }
  handleImageDescriptionChange(description, index) {
    let imageDescriptions = this.state.imageDescriptions.concat();
    imageDescriptions[index] = description;

    this.setState({
      imageDescriptions
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
  removeDroppedImage(index) {
    this.setState({
      droppedFiles: this.state.droppedFiles.filter((file, i) => index !== i)
    });
  }
  removeMovieCreator(index) {
    this.setState({
      selectedMovieCreators: this.state.selectedMovieCreators.filter((creator, index2) => index2 !== index)
    });
  }
  handleSubmit() {

    debugger;
    this.props.dispatch(
      addMovie(
        this.state.title,
        this.state.hours,
        this.state.minutes,
        this.state.releaseDate,
        this.state.budget,
        this.state.description,
        this.state.gross,
        this.state.language,
        this.state.ageRequirement,
        this.state.droppedFiles,
        this.state.videos,
        this.state.selectedMovieCreators,
        this.state.imageTitles,
        this.state.imageDescriptions
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
            Pasirinkti nuotraukas
          </ControlLabel>
          <Dropzone onDrop={this.onImageDrop}>
            <div>Nuveskite nuotraukas čia</div>
          </Dropzone>

          <SelectedImagesPreviewTable
            droppedFiles={this.state.droppedFiles}
            removeDroppedImage={this.removeDroppedImage}
            onImageTitleChange={this.handleImageTitleChange}
            onImageDescriptionChange={this.handleImageDescriptionChange}
            titles={this.state.imageTitles}
            descriptions={this.state.imageDescriptions}
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
          Pridėti filmą
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

AddMovieForm.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  movieCreators: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

function mapStateToProps(state) {
  return {
    movieCreators: state.cinemaStudioPage.movieCreators
  };
}

export default connect(mapStateToProps)(AddMovieForm);