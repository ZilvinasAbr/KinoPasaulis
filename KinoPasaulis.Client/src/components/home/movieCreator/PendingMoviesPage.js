import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import MovieCreatorNavigationBar from './MovieCreatorNavigationBar';
import { Button, Popover, ButtonToolbar, OverlayTrigger, Col, Table, Modal, Checkbox, FormControl, Thumbnail } from 'react-bootstrap';

class PendingMoviesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            pendingMovies: []
        }
    }

    paintImage(movie) {
        if (movie.images.length != 0) {
            return `/uploads/${movie.images[0].url}`;
        }
        return `http://www.jordans.com/~/media/jordans%20redesign/no-image-found.ashx?h=275&la=en&w=275&hash=F87BC23F17E37D57E2A0B1CC6E2E3EEE312AAD5B`;
    }

    approve(movieId, approve)
    {
        console.log(movieId);

        axios.post('/api/MovieCreator/setMovie', {
            Value: approve,
            MovieId: movieId,
        })
            .then(response => {
                console.log('success');
                console.log(response);
                if(approve === true)
                    alert("Veikla sėkmingai patvirtinta.");
                else
                    alert("Veikla sėkmingai atmesta.");
                this.setState({
                    pendingMovies: this.state.pendingMovies.filter(movie => movie.id !== movieId)
                });
                if(this.state.pendingMovies.length <= 0) {
                    return (
                        <tr>
                            <td colSpan={7}>
                                Nėra, ką patvirtinti/atmesti.
                            </td>
                        </tr>
                    );
                }
            })
            .catch(error => {
                console.log(error);
                alert("Įvyko klaida.");
            })
    }

    componentDidMount() {

        axios.get('/api/moviecreator/pendingMovies')
            .then(response => {
                this.setState({
                    pendingMovies: response.data
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderMovies() {
        let movies = this.state.pendingMovies;

        if(movies.length <= 0) {
            return (
                <tr>
                    <td colSpan={7}>
                        Nėra, ką patvirtinti/atmesti.
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
                        <Button onClick={() => this.approve(movie.id, true)} bsStyle="success"> Patvirtinti </Button>
                        <Button onClick={() => this.approve(movie.id, false)} bsStyle="danger"> Atmesti </Button>
                    </Thumbnail>
                </Col>
            </div>
        });
    }

    drawMovies() {
        let movies = this.state.pendingMovies;
        console.log(movies);
        return movies.map((movie, index) => (
            <h1> {movie.title} </h1>
        ))
    }

    render() {
        return (
        <div>
            <MovieCreatorNavigationBar />
            <h1> Patvirtinti filmų veiklą </h1>
            {this.renderMovies()}
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        userData: state.homePage.userData
    }
}

export default connect(mapStateToProps)(PendingMoviesPage);