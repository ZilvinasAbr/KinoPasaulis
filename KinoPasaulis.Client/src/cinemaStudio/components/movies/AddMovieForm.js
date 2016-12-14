import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import FileReaderInput from 'react-file-reader-input';
import Dropzone from 'react-dropzone';

import { addMovie } from '../../actions/movieActions';

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
      droppedFiles: []
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
  handleOnReleaseDateChange(e) {
    this.setState({
      releaseDate: e.target.value
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
        this.state.droppedFiles
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

        <FormGroup controlId="releaseDate">
          <ControlLabel>
            Išleidimo data
          </ControlLabel>
          <FormControl
            type="text"
            placeholder="Išleidimo data"
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

        <Dropzone onDrop={this.onImageDrop}>
          <div>Nuveskite nuotraukas čia</div>
        </Dropzone>

        <Button bsStyle="primary" onClick={this.handleSubmit}>
          Pridėti filmą
        </Button>
      </div>
    );
  }
}

AddMovieForm.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

export default connect()(AddMovieForm);