import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { RadioGroup, Radio } from 'react-radio-group';

const VotingTable = ({ index, voting, selectedValue, onChange, addVote }) => (
  <div key={index}>
    <h3>{voting.title}</h3>
    <RadioGroup name={voting.title} selectedValue={selectedValue} onChange={(e) => onChange(e, index)}>
      <Table striped bordered condensed hover>
        <tbody>
        {voting.movieCreatorVotings.map((movieCreatorVoting, index) => (
          <tr key={index}>
            <td><Radio value={movieCreatorVoting.movieCreator.id} /> {movieCreatorVoting.movieCreator.firstName} {movieCreatorVoting.movieCreator.lastName}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </RadioGroup>
    <Button bsStyle="primary" onClick={() => addVote(voting.id, selectedValue)}> Balsuoti </Button>
  </div>
);

export default VotingTable;