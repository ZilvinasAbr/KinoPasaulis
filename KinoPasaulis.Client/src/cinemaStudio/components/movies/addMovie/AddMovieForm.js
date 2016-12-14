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
import { addMovie } from '../../../actions/movieActions';
import SelectVideoModal from './SelectVideoModal';

class AddMovieForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      releaseDate: '',
      budget: '',
      description: '',
      gross: '',
      language: '',
      ageRequirement: '',
      droppedFiles: [],
      videos: [],
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
    this.onImageDrop = this.onImageDrop.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
    this.removeVideo = this.removeVideo.bind(this);
  }

  onImageDrop(files) {
    debugger;
    console.log('Received files:', files);

    this.setState({
      droppedFiles: [ ...this.state.droppedFiles, ...files]
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

  removeVideo(index) {
    this.setState({
      videos: this.state.videos.filter((video, index2) => index2 !== index)
    });
  }

  handleSubmit() {
    this.props.dispatch(
      addMovie(
        this.state.title,
        this.state.releaseDate,
        this.state.budget,
        this.state.description,
        this.state.gross,
        this.state.language,
        this.state.ageRequirement,
        this.state.droppedFiles,
        this.state.videos
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
          <Dropzone onDrop={this.onImageDrop}>
            <div>Nuveskite nuotraukas čia</div>
          </Dropzone>
        </FormGroup>

        <FormGroup>
          <VideosTable
            videos={this.state.videos}
            removeVideo={this.removeVideo}
          />
          <Button bsStyle="success" onClick={this.openModal}>
            Pridėti video
          </Button>
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
  dispatch: React.PropTypes.func.isRequired
};

export default connect()(AddMovieForm);