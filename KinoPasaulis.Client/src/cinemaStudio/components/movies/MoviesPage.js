import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { push } from 'react-router-redux';
import { Col, Table } from 'react-bootstrap';

import {
  fetchCinemaStudioMovies,
  deleteMovie
} from '../../actions/movieActions';
import CinemaStudioNavigationBar from '../CinemaStudioNavigationBar';

const ModalInstance = ({isOpen, selectedMovie, onDelete, onClose}) => {
  if(isOpen) {
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Pašalinti filmą</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Ar tikrai norite pašalinti {selectedMovie.title} filmą?
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="danger" onClick={() => onDelete(selectedMovie.id)}>Pašalinti</Button>
            <Button bsStyle="primary" onClick={onClose}>Atšaukti</Button>
          </Modal.Footer>

        </Modal.Dialog>
      </div>
    );
  }

  return null;
};


class MoviesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      selectedMovie: null
    };

    this.handleAddMovie = this.handleAddMovie.bind(this);
    this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
    this.renderMovie = this.renderMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchCinemaStudioMovies());
  }
  handleAddMovie() {
    this.props.dispatch(push('/cinemaStudio/addMovie'));
  }
  handleOpenDeleteModal(index) {
    this.setState({
      isModalOpen: true,
      selectedMovie: this.props.movies[index]
    });
  }
  deleteMovie(movieId) {
    this.setState({
      isModalOpen: false,
      selectedMovie: null
    });

    this.props.dispatch(deleteMovie(movieId));
  }
  closeModal() {
    this.setState({
      isModalOpen: false,
      selectedMovie: null
    });
  }
  renderMovie(movie, index) {
    return (
      <tr key={index}>
        <td>{index+1}</td>
        <td>
          <a href="javascript:void(0)"
             onClick={() =>
               this.props.dispatch(
                 push(`/cinemaStudio/movie/${movie.id}`)
               )}>
            {movie.title}
          </a>
        </td>
        <td>{movie.releaseDate}</td>
        <td>{movie.budget}</td>
        <td>{movie.gross}</td>
        <td>{movie.language}</td>
        <td>{movie.ageRequirement}</td>
        <td>
          <Button bsStyle="success" onClick={() => this.props.dispatch(push(`/cinemaStudio/editMovie/${movie.id}`))}>
            Redaguoti
          </Button>
          <Button bsStyle="danger" onClick={() => this.handleOpenDeleteModal(index)}>
            Pašalinti
          </Button>
        </td>
      </tr>
    )
  }

  render() {
    return (
      <div>
        <ModalInstance
          isOpen={this.state.isModalOpen}
          selectedMovie={this.state.selectedMovie}
          onDelete={this.deleteMovie}
          onClose={this.closeModal}
        />
        <CinemaStudioNavigationBar />
        <Col lg={2} lgOffset={5}>
          <h1>Kino filmai</h1>
        </Col>
        <Col lg={8} lgOffset={2}>
          <Button bsStyle="primary" onClick={this.handleAddMovie}>
            Pridėti filmą
          </Button>
          <Table striped bordered condensed hover>
            <thead>
            <tr>
              <th>#</th>
              <th>Pavadinimas</th>
              <th>Išleidimo data</th>
              <th>Pastatymo kaina</th>
              <th>Pajamos</th>
              <th>Kalba</th>
              <th>Amžiaus cenzas</th>
              <th>Veiksmai</th>
            </tr>
            </thead>
            <tbody>
            {this.props.movies.length > 0 ? this.props.movies.map(this.renderMovie) : (
                <tr>
                  <td colSpan={8}>
                    Nėra filmų
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </div>
    );
  }
}

MoviesPage.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  movies: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

function mapStateToProps(state) {
  return {
    movies: state.cinemaStudioPage.movies || []
  };
}

export default connect(mapStateToProps, null)(MoviesPage);