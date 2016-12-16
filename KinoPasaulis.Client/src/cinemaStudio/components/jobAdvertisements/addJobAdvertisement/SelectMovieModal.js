import React from 'react';
import Modal from 'react-modal';
import
{
  Button,
  FormControl,
  FormGroup,
  ControlLabel,
  Table
} from 'react-bootstrap';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class SelectMovieModal extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMovies(movies) {
    if (movies.length <= 0) {
      return (
        <tr>
          <td colSpan={2}>
            Nėra filmų
          </td>
        </tr>
      );
    }

    return movies.map((movie, index) => (
      <tr key={index}>
        <td>{movie.title}</td>
        <td>
          <Button
            bsStyle="success"
            onClick={() => this.props.selectMovie(movie)}
          >
            Pasirinkti
          </Button>
        </td>
      </tr>
    ));

  }

  render() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onAfterOpen={this.props.afterOpenModal}
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel="Select a video"
      >
        <Table striped bordered condensed hover>
          <thead>
          <tr>
            <th>Filmo pavadinimas</th>
            <th>Veiksmai</th>
          </tr>
          </thead>
          <tbody>
          {this.renderMovies(this.props.movies)}
          </tbody>
        </Table>

        <Button bsStyle="danger" onClick={this.props.closeModal}>
          Uždaryti
        </Button>
      </Modal>
    );
  }
}

SelectMovieModal.propTypes = {
  movies: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  modalIsOpen: React.PropTypes.bool.isRequired,
  afterOpenModal: React.PropTypes.func,
  closeModal: React.PropTypes.func.isRequired,
  selectMovie: React.PropTypes.func.isRequired
};

export default SelectMovieModal;