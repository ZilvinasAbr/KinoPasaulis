import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import axios from 'axios';
import { Grid, Row, Col, Button, Table } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';

import NavigationBar from '../../components/common/NavigationBar';
import ImageCarousel from '../../cinemaStudio/components/movies/moviePage/ImageCarousel';
import MovieDetails from '../../cinemaStudio/components/movies/moviePage/MovieDetails';
import MovieVideos from '../../cinemaStudio/components/movies/moviePage/MovieVideos';
import Events from '../../cinemaStudio/components/movies/moviePage/Events';
import MovieCreatorsTable from '../../cinemaStudio/components/movies/moviePage/MovieCreatorsTable';

class MoviesDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        title: '',
        images: [],
        videos: [],
        currentEvents: [],
        pastEvents: [],
        movieCreators: [],
        ratings: []
      },
      inputValue: '',
      rating: 0,
      rated: false
    };
  }

  componentDidMount() {
    axios.get(`/api/client/getMovie/?id=` + this.props.params.id)
      .then(response => {
        this.setState({
          movie: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });

    axios.get(`/api/client/isRatedMovie/?id=` + this.props.params.id)
      .then(response => {
        this.setState({
          rated: response.data,
          inputValue: response.data.comment || '',
          rating: response.data.value || 0
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleInputValueChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  addRating(comment, rating) {
    axios.post('/api/client/addRating', {
      MovieId: this.props.params.id,
      Comment: comment,
      Value: rating
    })
      .then(response => {
        if (response.data == true) {
          alert('Įvertinote filmą');
          axios.get(`/api/client/getMovie/?id=` + this.props.params.id)
            .then(response => {
              this.setState({
                movie: response.data
              });
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          alert('Pasirinkite įvertinimą')
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  changeRating(comment, rating) {
    axios.post('/api/client/changeRating', {
      RatingId: this.state.rated.id,
      Comment: comment,
      Value: rating
    })
      .then(response => {
        if (response.data == true) {
          alert('Įvertinote filmą');
          axios.get(`/api/client/getMovie/?id=` + this.props.params.id)
            .then(response => {
              this.setState({
                movie: response.data
              });
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          alert('Pasirinkite įvertinimą')
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  renderRating() {
    let rated = this.state.rated
    if(rated == false)
    {
      return (
        <div>
          <StarRatingComponent
            name="rate"
            starCount={10}
            value={this.state.rating}
            onStarClick={this.onStarClick.bind(this)}
          />
          <br></br>
          <textarea rows="4" cols="50" value={this.state.inputValue} onChange={(e) => this.handleInputValueChange(e)}/>
          <br></br>
          <Button bsStyle="primary" onClick={() => this.addRating(this.state.inputValue, this.state.rating)}> Įvertinti </Button>
        </div>
      );
    }else {
      let comment = rated.comment;
      if (comment == null)
      {
        comment = '';
      }
      return (
        <div>
          <StarRatingComponent
            name="rate"
            starCount={10}
            value={this.state.rating}
            onStarClick={this.onStarClick.bind(this)}
          />
          <br></br>
          <textarea rows="4" cols="50" value={this.state.inputValue} onChange={(e) => this.handleInputValueChange(e)}/>
          <br></br>
          <Button bsStyle="primary" onClick={() => this.changeRating(this.state.inputValue, this.state.rating)}> Įvertinti </Button>
        </div>
      );
    }
  }

  renderRatings() {
    let ratings = this.state.movie.ratings;
    return ratings.map((rating, index) => {
      return <tr key={index}>
          <td>{rating.client.firstName}</td>
          <td>{rating.value}</td>
          <td>{rating.comment}</td>
        </tr>
    });
  }

  renderAvgRating() {
    let ratings = this.state.movie.ratings;
    let average = 0;
    let sum = 0;
    for(let i=0; i<ratings.length; i++)
    {
      sum = sum + ratings[i].value;
    }
    average = sum/ratings.length;
    if(ratings.length == 0)
    {
      average = "Nėra";
    }
    return (
      <Table>
        <tbody>
        <tr>
          <td><h3>Filmo vidutinis įvertinimas: </h3></td>
          <td><h3>{Math.round(average * 100) / 100}</h3></td>
        </tr>
        </tbody>
      </Table>
    );
  }

  render() {
    const movie = this.state.movie;
    return (
      <div>
        <NavigationBar />
        <Grid>
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={4} mdOffset={4} lg={4} lgOffset={4}>
              <h1>{movie.title}</h1>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={6} lgOffset={3}>
              <ImageCarousel images={this.state.movie.images}/>
            </Col>
          </Row>
          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
              <MovieDetails movie={this.state.movie}/>
              {this.renderAvgRating()}
              <p>Įvertinkite filmą:</p>
              {this.renderRating()}
            </Col>
          </Row>

          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
              <h3>Prie filmo prisidėję kino kūrėjai:</h3>
            </Col>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
              <MovieCreatorsTable
                movieCreators={this.state.movie.movieCreators}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
              <h3>Kur yra rodomas šis filmas šiuo metu:</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
              <Events events={this.state.movie.currentEvents}/>
            </Col>

          </Row>
          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
              <h3>Kur buvo rodomas šis filmas seniau:</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
              <Events events={this.state.movie.pastEvents}/>
            </Col>
          </Row>
          <MovieVideos videos={this.state.movie.videos}/>
          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
              <h3>Komentarai:</h3>
              <Table striped bordered condensed hover>
                <thead>
                <tr>
                  <td>Klientas</td>
                  <td>Įvertinimas</td>
                  <td>Komentaras</td>
                </tr>
                </thead>
                <tbody>
                  {this.renderRatings()}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

MoviesDetail.propTypes = {

};

export default MoviesDetail;