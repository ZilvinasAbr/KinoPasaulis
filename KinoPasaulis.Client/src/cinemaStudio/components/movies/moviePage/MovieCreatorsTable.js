import React from 'react';
import { Table } from 'react-bootstrap';

const renderMovieCreator = (movieCreator, index) => (
  <tr key={index}>
    <td>{movieCreator.firstName}</td>
    <td>{movieCreator.lastName}</td>
  </tr>
);

const MovieCreatorsTable = ({ movieCreators }) => (
  <Table striped bordered condensed hover>
    <thead>
    <tr>
      <td>Vardas</td>
      <td>Pavardė</td>
    </tr>
    </thead>
    <tbody>
    {movieCreators.length > 0 ?
      movieCreators.map(renderMovieCreator) :
      (
        <tr>
          <td colSpan={2}>Nėra šiam filmui nurodytų filmų kūrėjų</td>
        </tr>
      )
    }
    </tbody>
  </Table>
);

export default MovieCreatorsTable;