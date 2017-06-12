import React from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';

import NavigationBar from '../../../../components/common/NavigationBar';
import ImageCarousel from './ImageCarousel';
import MovieDetails from './MovieDetails';
import MovieVideos from './MovieVideos';
import Events from './Events';
import MovieCreatorsTable from './MovieCreatorsTable';

class MoviePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: {
        title: '',
        images: [],
        videos: [],
        currentEvents: [],
        pastEvents: [],
        movieCreators: []
      }
    };
  }

  componentDidMount() {
    axios.get(`/api/cinemaStudio/movie/${this.props.params.id}`)
      .then(response => {
        this.setState({
          movie: response.data
        });
      })
      .catch(error => {
        console.error(error);
      })
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
              <ImageCarousel images={this.state.movie.images} />
            </Col>
          </Row>
          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
              <MovieDetails movie={this.state.movie} />
            </Col>
          </Row>

          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
              <h3>Prie filmo prisidėję filmų kūrėjai:</h3>
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
              <Events events={this.state.movie.currentEvents} />
            </Col>

          </Row>
          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
              <h3>Kur buvo rodomas šis filmas seniau:</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
              <Events events={this.state.movie.pastEvents} />
            </Col>
          </Row>
          <MovieVideos videos={this.state.movie.videos} />
        </Grid>
      </div>
    );
  }
}

MoviePage.propTypes = {

};

export default MoviePage;