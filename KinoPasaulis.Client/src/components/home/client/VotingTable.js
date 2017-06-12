import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { RadioGroup, Radio } from 'react-radio-group';
import moment from 'moment';

const VotingTable = ({ index, voting, selectedValue, onChange, addVote }) => {
  function countVotes(movieCreatorId, voting) {
    var count = 0;

    for (var i = 0; i < voting.votes.length; i++) {
      if (voting.votes[i].movieCreator.id == movieCreatorId)
        count++;
    }
    return count;
  }
  
  return (
    <div key={index}>
      <h3>{voting.title}</h3>
	  <p>Balsavimo pabaiga: {moment(voting.endDate).format('YYYY/MM/DD HH:mm')}</p>
      <RadioGroup name={voting.title} selectedValue={selectedValue} onChange={(e) => onChange(e, index)}>
        <Table striped bordered condensed hover>
          <tbody>
          {voting.movieCreatorVotings.map((movieCreatorVoting, index) => (
            <tr key={index}>
              <td><Radio value={movieCreatorVoting.movieCreator.id} /> {movieCreatorVoting.movieCreator.firstName} {movieCreatorVoting.movieCreator.lastName} (
			  <b>Balsai: {countVotes(movieCreatorVoting.movieCreator.id, voting)}</b>)</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </RadioGroup>
      <Button bsStyle="primary" onClick={() => addVote(voting.id, selectedValue)}> Balsuoti </Button>
    </div>
  );
}

export default VotingTable;