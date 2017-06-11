import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import axios from 'axios';
import MovieCreatorNavigationBar from './MovieCreatorNavigationBar';
import {
  Button,
  Popover,
  ButtonToolbar,
  OverlayTrigger,
  Col,
  Table,
  Modal,
  Checkbox,
  FormControl,
  Thumbnail
} from 'react-bootstrap';

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

    if (movies.length <= 0) {
      return (
        <table>
          <tbody>
          <tr>
            <td colSpan={7}>
              Neprisidėta prie nei vieno filmo.
            </td>
          </tr>
          </tbody>
        </table>
      );
    }

    return movies.map((movie, index) => {
      return <div key={index}>
        <Col md={4}>
          <Thumbnail src={this.paintImage(movie)} alt="Filmo plakatas">
            <h2> {movie.title} </h2>
            <h3> {movie.cinemaStudio.name} </h3>
            <p> {movie.description} </p>
          </Thumbnail>
        </Col>
      </div>
    });
  }

  /*drawMovies() {
   let movies = this.state.taggedMovies;
   return movies.map((movie, index) => (
   <h1> {movie.title} </h1>
   ))
   }

   goToPendingMovies() {
   push('./pendingMovies');
   }*/

  render() {
    return (
      <div>
        <MovieCreatorNavigationBar />
        <h1> Filmai, prie kurių prisidėta </h1>
        <Button onClick={this.props.goToPendingMovies}>Nepatvirtinta veikla...</Button>
        {this.renderMovies()}
      </div>);
  }
}

TaggedMoviesPage.propTypes = {
  goToPendingMovies: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    userData: state.homePage.userData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goToPendingMovies: () => {
      dispatch(push('movieCreator/pendingMovies'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaggedMoviesPage);