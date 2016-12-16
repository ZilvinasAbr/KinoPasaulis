import React from 'react';
import Modal from 'react-modal';
import
{
  Button,
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

class SelectSpecialtyModal extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSpecialties(specialties) {
    if (specialties.length <= 0) {
      return (
        <tr>
          <td colSpan={2}>
            Nėra pareigų sistemoje
          </td>
        </tr>
      );
    }

    return specialties.map((specialty, index) => (
      <tr key={index}>
        <td>{specialty.title}</td>
        <td>
          <Button
            bsStyle="success"
            onClick={() => this.props.selectSpecialty(specialty)}
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
        contentLabel="Select a specialty"
      >
        <Table striped bordered condensed hover>
          <thead>
          <tr>
            <th>Pareigos pavadinimas</th>
            <th>Veiksmai</th>
          </tr>
          </thead>
          <tbody>
          {this.renderSpecialties(this.props.specialties)}
          </tbody>
        </Table>

        <Button bsStyle="danger" onClick={this.props.closeModal}>
          Uždaryti
        </Button>
      </Modal>
    );
  }
}

SelectSpecialtyModal.propTypes = {
  specialties: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  modalIsOpen: React.PropTypes.bool.isRequired,
  afterOpenModal: React.PropTypes.func,
  closeModal: React.PropTypes.func.isRequired,
  selectSpecialty: React.PropTypes.func.isRequired
};

export default SelectSpecialtyModal;