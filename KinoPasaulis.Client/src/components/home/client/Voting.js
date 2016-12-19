import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import axios from 'axios';
import { Table, Button, Col } from 'react-bootstrap';
import moment from 'moment';
import VotingTable from './VotingTable';

import NavigationBar from '../../../components/common/NavigationBar';

class Voting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votings: [],
      movieCreatorId: 0,
      selectedValues: []
    };
  }

  componentDidMount() {
    axios.get('/api/voting/currentVotings')
      .then(response => {
        console.log(response.data)
        this.setState(
          {
            votings: response.data,
            selectedValues: response.data.map(() => '')
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  addVote(votingId, movieCreatorId) {
    axios.post('/api/client/addVote', {
      VotingId: votingId,
      MovieCreatorId: movieCreatorId
    })
      .then(response => {
        if (response.data == true) {
          alert('Ačiū už balsą!');
          console.log('success');
        } else {
          alert('Pasirinkite įvertinimą')
          console.log('response.data returned false');
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleChange(value, index) {
    let selectedValues = this.state.selectedValues.concat();

    selectedValues[index] = value;

    this.setState({
      selectedValues
    });
  }

  render() {
    return (
      <div>
        <NavigationBar/>
        <Col md={5}>
        {this.state.votings.map((voting, index) =>
          <VotingTable
            key={index}
            index={index}
            voting={voting}
            selectedValue={this.state.selectedValues[index]}
            onChange={(e, index) => this.handleChange(e, index)}
            addVote={this.addVote}
          />)}
        </Col>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Voting);