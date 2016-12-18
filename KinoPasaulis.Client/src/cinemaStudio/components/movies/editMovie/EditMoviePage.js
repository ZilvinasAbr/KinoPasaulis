import React from 'react';

import EditMovieForm from './EditMovieForm';
import CinemaStudioNavigationBar from '../../CinemaStudioNavigationBar';

const AddMoviePage = ({ params }) => {
  return (
    <div>
      <CinemaStudioNavigationBar />
      <div>
        <div className="container col-md-4 col-md-offset-4">
          <h1> Filmo redagavimas</h1>
          <hr />
          <EditMovieForm movieId={parseInt(params.id)} />
        </div>
      </div>

    </div>
  );
};

export default AddMoviePage;