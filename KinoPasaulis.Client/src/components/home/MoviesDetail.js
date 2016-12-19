import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';

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
        movieCreators: []
      }
    };
  }

  componentDidMount() {
    axios.get(`/api/client/getMovie/?id=` + this.props.params.id)
      .then(response => {
        console.log(response.data);
        this.setState({
          movie: response.data
        });
      })
      .catch(error => {
        console.log(error);
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
              <ImageCarousel images={this.state.movie.images}/>
            </Col>
          </Row>
          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
              <MovieDetails movie={this.state.movie}/>
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
        </Grid>
      </div>
    );
  }
}

MoviesDetail.propTypes = {

};

export default MoviesDetail;