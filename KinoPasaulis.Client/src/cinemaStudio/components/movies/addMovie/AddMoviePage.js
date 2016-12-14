import React from 'react';
import AddMovieForm from './AddMovieForm';

import CinemaStudioNavigationBar from '../../CinemaStudioNavigationBar';

const AddMoviePage = ({}) => {
    return (
        <div>
            <CinemaStudioNavigationBar />
            <div>
                <div className="container col-md-4 col-md-offset-4">
                    <h1> Filmo pridėjimas</h1>
                    <hr />
                    <AddMovieForm />
                </div>
            </div>

        </div>
    );
};

export default AddMoviePage;