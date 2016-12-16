import React from 'react';
import { connect } from 'react-redux';
import
{
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Row
} from 'react-bootstrap';

import { fetchCinemaStudioMovies } from '../../../actions/movieActions';
import SelectedMovieTable from './SelectedMovieTable';
import SelectedSpecialtyTable from './SelectedSpecialtyTable';
import SelectMovieModal from './SelectMovieModal';
import SelectSpecialtyModal from './SelectSpecialtyModal';
import {
  addJobAdvertisement,
  fetchSpecialties
} from '../../../actions/jobAdvertisements';

class AddJobAdvertisementForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      duration: '',
      payRate: '',
      movie: null,
      specialty: null,
      isSelectMovieModalOpen: false,
      isSelectSpecialtyModalOpen: false
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchCinemaStudioMovies());
    this.props.dispatch(fetchSpecialties());
  }

  removeSelectedMovie() {
    this.setState({
      movie: null
    });
  }

  removeSelectedSpecialty() {
    this.setState({
      specialty: null
    });
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value
    });
  }

  handleDurationChange(e) {
    this.setState({
      duration: e.target.value
    });
  }

  handlePayRateChange(e) {
    this.setState({
      payRate: e.target.value
    });
  }

  handleSubmit() {
    const { title, description, duration, payRate, movie, specialty } =
      this.state;

    this.props.dispatch(addJobAdvertisement(
      title, description, duration, payRate, movie, specialty
    ));
  }

  selectMovie(movie) {
    this.setState({
      movie,
      isSelectMovieModalOpen: false
    });
  }

  selectSpecialty(specialty) {
    this.setState({
      specialty,
      isSelectSpecialtyModalOpen: false
    });
  }

  closeMovieModal() {
    this.setState({
      isSelectMovieModalOpen: false
    });
  }

  closeSpecialtyModal() {
    this.setState({
      isSelectSpecialtyModalOpen: false
    });
  }

  openSelectMovieModal() {
    this.setState({
      isSelectMovieModalOpen: true
    });
  }

  openSelectSpecialtyModal() {
    this.setState({
      isSelectSpecialtyModalOpen: true
    });
  }

  render() {
    return (
      <Row>
        <FormGroup>
          <ControlLabel>
            Pasirinkti filmą
          </ControlLabel>
          <SelectedMovieTable
            movie={this.state.movie}
            removeSelectedMovie={() => this.removeSelectedMovie()}
          />
          {this.state.movie == null && (
            <Button bsStyle="success" onClick={() => this.openSelectMovieModal()}>
              Pasirinkti filmą
            </Button>
          )}
        </FormGroup>
        <SelectMovieModal
          movies={this.props.movies}
          modalIsOpen={this.state.isSelectMovieModalOpen}
          closeModal={() => this.closeMovieModal()}
          selectMovie={movie => this.selectMovie(movie)}
        />

        <FormGroup>
          <ControlLabel>
            Pasirinkti ieškomą pareigą
          </ControlLabel>
          <SelectedSpecialtyTable
            specialty={this.state.specialty}
            removeSelectedSpecialty={() => this.removeSelectedSpecialty()}
          />
          {this.state.specialty == null && (
            <Button bsStyle="success" onClick={() => this.openSelectSpecialtyModal()}>
              Pasirinkti pareigą
            </Button>
          )}
        </FormGroup>
        <SelectSpecialtyModal
          specialties={this.props.specialties}
          modalIsOpen={this.state.isSelectSpecialtyModalOpen}
          closeModal={() => this.closeSpecialtyModal()}
          selectSpecialty={specialty => this.selectSpecialty(specialty)}
        />

        <FormGroup controlId="title">
          <ControlLabel>
            Antraštė
          </ControlLabel>
          <FormControl
            type="text"
            placeholder="Antraštė"
            value={this.state.title}
            onChange={(e) => this.handleTitleChange(e)}
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
            onChange={(e) => this.handleDescriptionChange(e)}
          />
        </FormGroup>

        <FormGroup controlId="duration">
          <ControlLabel>
            Trukmė dienomis
          </ControlLabel>
          <FormControl
            type="number"
            placeholder="Trukmė"
            value={this.state.duration}
            onChange={(e) => this.handleDurationChange(e)}
          />
        </FormGroup>

        <FormGroup controlId="payrate">
          <ControlLabel>
            Atlygis
          </ControlLabel>
          <FormControl
            type="number"
            placeholder="Atlygis"
            value={this.state.payRate}
            onChange={(e) => this.handlePayRateChange(e)}
          />
        </FormGroup>

        <Button bsStyle="primary" onClick={() => this.handleSubmit()}>
          Pridėti darbo skelbimą
        </Button>
      </Row>
    )
  }
}

AddJobAdvertisementForm.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  movies: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

function mapStateToProps(state) {
  return {
    movies: state.cinemaStudioPage.movies,
    specialties: state.cinemaStudioPage.specialties
  };
}

export default connect(mapStateToProps)(AddJobAdvertisementForm);