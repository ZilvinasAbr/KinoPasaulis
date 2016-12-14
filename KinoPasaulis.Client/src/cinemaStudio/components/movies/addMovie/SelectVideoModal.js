import React from 'react';
import Modal from 'react-modal';
import
{
  Button,
  FormControl,
  FormGroup,
  ControlLabel
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

class SelectVideoModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      url: '',
      description: '',
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  onSelectVideo() {
    const {title, url, description} = this.state;

    this.props.selectVideo(title, url, description);
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  handleUrlChange(e) {
    this.setState({
      url: e.target.value
    });
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value
    });
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
        <FormGroup controlId="title">
          <ControlLabel>
            Pavadinimas
          </ControlLabel>
          <FormControl
            type="text"
            placeholder="Pavadinimas"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
        </FormGroup>

        <FormGroup controlId="Url">
          <ControlLabel>
            Video nuoroda (tinka tik Youtube)
          </ControlLabel>
          <FormControl
            type="text"
            placeholder="Nuoroda"
            value={this.state.url}
            onChange={this.handleUrlChange}
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
            onChange={this.handleDescriptionChange}
          />
        </FormGroup>

        <Button bsStyle="primary" onClick={() => this.onSelectVideo()}>
          Pridėti
        </Button>
        <Button bsStyle="danger" onClick={this.props.closeModal}>
          Uždaryti
        </Button>
      </Modal>
    );
  }
}

SelectVideoModal.propTypes = {
  modalIsOpen: React.PropTypes.bool.isRequired,
  afterOpenModal: React.PropTypes.func,
  closeModal: React.PropTypes.func.isRequired,
  selectVideo: React.PropTypes.func.isRequired
};

export default SelectVideoModal;