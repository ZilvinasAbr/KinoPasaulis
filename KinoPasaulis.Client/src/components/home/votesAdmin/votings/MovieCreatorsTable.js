import React from 'react';
import { Table, Button } from 'react-bootstrap';

const MovieCreatorsTable = ({ movieCreators, removeMovieCreator}) => {
  function renderMovieCreator(movieCreator, index) {
    return (
      <tr key={index}>
        <td>{movieCreator.firstName}</td>
        <td>{movieCreator.lastName}</td>
        <td>
          <Button onClick={() => removeMovieCreator(index)} bsStyle="danger">
            Pašalinti
          </Button>
        </td>
      </tr>
    )
  }

  return (
    <Table striped bordered condensed hover>
      <thead>
      <tr>
        <th>Vardas</th>
        <th>Pavardė</th>
        <th>Veiksmai</th>
      </tr>
      </thead>
      <tbody>
      {movieCreators.length ? movieCreators.map(renderMovieCreator) : (
          <tr>
            <td colSpan={3}>
              Nepasirinkta filmų kūrėjų
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default MovieCreatorsTable;