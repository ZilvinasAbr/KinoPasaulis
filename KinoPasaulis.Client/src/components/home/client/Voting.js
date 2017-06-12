import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Table, Col } from 'react-bootstrap';
import VotingTable from './VotingTable';

import NavigationBar from '../../../components/common/NavigationBar';

class Voting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votings: [],
      voted: [],
      movieCreatorId: 0,
      selectedValues: []
    };
  }

  componentDidMount() {
    axios.get('/api/voting/currentVotings')
      .then(response => {
        this.setState(
          {
            votings: response.data,
            selectedValues: response.data.map(() => '')
          });
      })
      .catch(error => {
        console.error(error);
      });

    axios.get(`/api/client/isVoted`)
      .then(response => {
        this.setState({
          voted: response.data,
        });
      })
      .catch(error => {
        console.error(error);
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
            axios.get(`/api/client/isVoted`)
              .then(response => {
                this.setState({
                  voted: response.data,
                });
              })
              .catch(error => {
                console.error(error);
              });
          } else {
            alert('Pasirinkite įvertinimą');
          }
        })
        .catch(error => {
          console.error(error);
        })
  }

  handleChange(value, index) {
    let selectedValues = this.state.selectedValues.concat();

    selectedValues[index] = value;

    this.setState({
      selectedValues
    });
  }

  renderMyVotes() {
    let votes = this.state.voted;
    return votes.map((vote, index) => {
      return <tr key={index}>
        <td>{vote.voting.title}</td>
        <td>{vote.movieCreator.firstName} {vote.movieCreator.lastName}</td>
      </tr>
    });
  }

  render() {
    return (
      <div>
        <NavigationBar/>
        <Col md={5}><h3>Mano balsai</h3>
          <Table striped bordered condensed hover>
            <thead>
            <tr>
              <td>Balsavimas</td>
              <td>Pasirinkimas</td>
            </tr>
            </thead>
            <tbody>
            {this.renderMyVotes()}
            </tbody>
          </Table>
        </Col>
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
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Voting);