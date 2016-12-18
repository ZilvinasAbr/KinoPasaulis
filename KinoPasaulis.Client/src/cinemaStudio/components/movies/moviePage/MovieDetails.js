import React from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';

const MovieDetails = ({ movie }) => (
  <Table striped bordered condensed hover>
    <tbody>
    <tr>
      <td>Filmo pavadinimas:</td>
      <td>{movie.title}</td>
    </tr>
    <tr>
      <td>Trukmė</td>
      <td>{movie.duration}</td>
    </tr>
    <tr>
      <td>Išleidimo data:</td>
      <td>{moment(movie.releaseDate).format('YYYY-MM-DD HH:MM')}</td>
    </tr>
    <tr>
      <td>Pastatymo kaina:</td>
      <td>{movie.budget}</td>
    </tr>
    <tr>
      <td>Pajamos:</td>
      <td>{movie.gross}</td>
    </tr>
    <tr>
      <td>Kalba:</td>
      <td>{movie.language}</td>
    </tr>
    <tr>
      <td>Amžiaus cenzas:</td>
      <td>{movie.ageRequirement}</td>
    </tr>
    <tr>
      <td>Description:</td>
      <td>{movie.description}</td>
    </tr>
    </tbody>
  </Table>
);

export default MovieDetails;