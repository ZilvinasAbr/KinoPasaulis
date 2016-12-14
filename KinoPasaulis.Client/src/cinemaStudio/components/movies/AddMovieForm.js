import React from 'react';
import { reduxForm } from 'redux-form';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import { addMovie } from '../../actions/movieActions';

const AddMovieForm = ({ fields, dispatch }) => {
    const {
        title,
        releaseDate,
        budget,
        description,
        gross,
        language,
        ageRequirement
    } = fields;

    function handleSubmit() {
        dispatch(
            addMovie(
                title.value,
                releaseDate.value,
                budget.value,
                description.value,
                gross.value,
                language.value,
                ageRequirement.value
            )
        );
    }

    return (
        <div className="row">
            <FormGroup controlId="title">
                <ControlLabel>
                    Pavadinimas
                </ControlLabel>
                <FormControl
                    type="text"
                    placeholder="Pavadinimas"
                    { ...title }
                />
            </FormGroup>

            <FormGroup controlId="releaseDate">
                <ControlLabel>
                    Išleidimo data
                </ControlLabel>
                <FormControl
                    type="text"
                    placeholder="Išleidimo data"
                    { ...releaseDate }
                />
            </FormGroup>

            <FormGroup controlId="budget">
                <ControlLabel>
                    Pastatymo kaina
                </ControlLabel>
                <FormControl
                    type="number"
                    placeholder="Pastatymo kaina"
                    { ...budget }
                />
            </FormGroup>

            <FormGroup controlId="description">
                <ControlLabel>
                    Aprašymas
                </ControlLabel>
                <FormControl
                    type="text"
                    placeholder="Aprašymas"
                    { ...description }
                />
            </FormGroup>

            <FormGroup controlId="gross">
                <ControlLabel>
                    Pajamos
                </ControlLabel>
                <FormControl
                    type="number"
                    placeholder="Pajamos"
                    { ...gross }
                />
            </FormGroup>

            <FormGroup controlId="language">
                <ControlLabel>
                    Kalba
                </ControlLabel>
                <FormControl
                    type="text"
                    placeholder="Kalba"
                    { ...language }
                />
            </FormGroup>

            <FormGroup controlId="ageRequirement">
                <ControlLabel>
                    Amžiaus cenzas
                </ControlLabel>
                <FormControl
                    type="text"
                    placeholder="Amžiaus cenzas"
                    { ...ageRequirement }
                />
            </FormGroup>

            <Button bsStyle="primary" onClick={handleSubmit}>
                Pridėti filmą
            </Button>
        </div>
    );
};

AddMovieForm.propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
};

const config = {
    form: 'addMovie',
    fields: [
        'title',
        'releaseDate',
        'budget',
        'description',
        'gross',
        'language',
        'ageRequirement'
    ]
};

export default reduxForm(config)(AddMovieForm);