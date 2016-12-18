import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import MovieCreatorNavigationBar from './MovieCreatorNavigationBar';
import { Button, Popover, ButtonToolbar, OverlayTrigger, Col, Table, Modal, Checkbox, FormControl, Thumbnail } from 'react-bootstrap';

class TaggedMoviesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            taggedMovies: []
        }
    }

    paintImage(movie) {
        if (movie.images.length != 0) {
            return `/uploads/${movie.images[0].url}`;
        }
        return `http://www.jordans.com/~/media/jordans%20redesign/no-image-found.ashx?h=275&la=en&w=275&hash=F87BC23F17E37D57E2A0B1CC6E2E3EEE312AAD5B`;
    }

    componentDidMount() {

        axios.get('/api/moviecreator/movies')
            .then(response => {
                this.setState({
                    taggedMovies: response.data
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderMovies() {
        let movies = this.state.taggedMovies;

        if(movies.length <= 0) {
            return (
                <tr>
                    <td colSpan={7}>
                        Neprisidėta prie nei vieno filmo.
                    </td>
                </tr>
            );
        }

        return movies.map((movie, index) => {
            return <div key={index}>
                <Col md={4}>
                    <Thumbnail src={this.paintImage(movie)} alt="242x200">
                        <h2> {movie.title} </h2>
                        <h3> {movie.cinemaStudio.name} </h3>
                        <p> {movie.description} </p>
                    </Thumbnail>
                </Col>
            </div>
        });
    }

    drawMovies() {
        let movies = this.state.taggedMovies;
        console.log(movies);
        return movies.map((movie, index) => (
            <h1> {movie.title} </h1>
        ))
    }

    render() {
        return (
        <div>
            <MovieCreatorNavigationBar />
            <h1> Filmai, prie kurių prisidėta </h1>
            <a href="./pendingMovies">Nepatvirtinta veikla...</a>
            {this.renderMovies()}
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        userData: state.homePage.userData
    }
}



export default connect(mapStateToProps)(TaggedMoviesPage);