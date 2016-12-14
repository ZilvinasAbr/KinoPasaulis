import React from 'react';
import Modal from 'react-modal';
import Autosuggest from 'react-autosuggest';
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

const movieCreators = [
  {
    id: 1,
    firstName: "Christian",
    lastName: "Bale"
  },
  {
    id: 2,
    firstName: "Heath",
    lastName: "Ledger"
  }
];

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : movieCreators.filter(mc => {
    const fullName = `${mc.firstName} ${mc.lastName}`.toLowerCase();

    return fullName.indexOf(inputValue) !== -1;
    });
};

const getSuggestionValue = suggestion => `${suggestion.firstName} ${suggestion.lastName}`;

const renderSuggestion = suggestion => (
  <div>
    {`${suggestion.firstName} ${suggestion.lastName}`}
  </div>
);

class SelectMovieCreatorModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
  }

  componentDidMount() {

  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    })
  };

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Įveskite ieškomo kino kūrėjo vardą, pavardę',
      value,
      onChange: this.onChange
    };

    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onAfterOpen={this.props.afterOpenModal}
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel="Select movie creator"
      >
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </Modal>
    );
  }
}

SelectMovieCreatorModal.propTypes = {
  modalIsOpen: React.PropTypes.bool.isRequired,
  onAfterOpen: React.PropTypes.func,
  closeModal: React.PropTypes.func.isRequired,
  selectMovieCreator: React.PropTypes.func.isRequired,
};

export default SelectMovieCreatorModal;