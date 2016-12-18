import React from 'react';
import axios from 'axios';
import { Grid, Row, Col, Carousel, Table } from 'react-bootstrap';
import moment from 'moment';

import CinemaStudioNavigationBar from '../CinemaStudioNavigationBar';

const renderCarouselImage = (image, index) => (
  <Carousel.Item key={index}>
    <img alt={image.title} src={`/uploads/${image.url}`} />
    <Carousel.Caption>
      <h3>{image.title}</h3>
      <p>{image.description}</p>
    </Carousel.Caption>
  </Carousel.Item>
);

const carouselInstance = (elements, func) => (
  <Carousel>
    {elements.map(func)}
  </Carousel>
);

const renderVideos = (videos) => (
  <div>
    {videos.map((video, index) => (
      <Row key={index}>
        <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
          <iframe
            width="100%"
            height="400px"
            src={video.url.replace("watch?v=", "v/")}
            allowFullScreen
          >
          </iframe>
        </Col>

      </Row>
    ))}
  </div>
);

const renderMovieDetails = (movie) => (
  <Row>
    <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
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
    </Col>
  </Row>
);

class MoviePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: {
        title: '',
        images: [],
        videos: [],
        currentEvents: [],
        pastEvents: []
      }
    };
  }

  componentDidMount() {
    axios.get(`/api/cinemaStudio/movie/${this.props.params.id}`)
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

  renderEventRow(event, index) {
    return (
      <tr key={index}>
        <td>{event.theather.title}</td>
        <td>{moment(event.startTime).format('YYYY-MM-DD HH:MM')}</td>
        <td>{moment(event.endTime).format('YYYY-MM-DD HH:MM')}</td>
      </tr>
    );
  }

  render() {
    const movie = this.state.movie;
    return (
      <div>
        <CinemaStudioNavigationBar />
        <Grid>
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={4} mdOffset={4} lg={4} lgOffset={4}>
              <h1>{movie.title}</h1>

            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={6} lgOffset={3}>
              {carouselInstance(this.state.movie.images, renderCarouselImage)}
            </Col>
          </Row>
          {renderMovieDetails(this.state.movie)}
          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
              <h3>Kur yra rodomas šis filmas šiuo metu:</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
              <Table striped bordered condensed hover>
                <thead>
                <tr>
                  <td>Kino teatro pavadinimas</td>
                  <td>Rodymo pradžia</td>
                  <td>Rodymo pabaiga</td>
                </tr>
                </thead>
                <tbody>
                {this.state.movie.currentEvents.length > 0 ?
                  this.state.movie.currentEvents.map(this.renderEventRow) :
                  (
                    <tr>
                      <td colSpan={3}>Šis filmas šiuo metu niekur nerodomas</td>
                    </tr>
                  )
                }
                </tbody>
              </Table>
            </Col>

          </Row>


          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
              <h3>Kur buvo rodomas šis filmas seniau:</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
              <Table striped bordered condensed hover>
                <thead>
                <tr>
                  <td>Kino teatro pavadinimas</td>
                  <td>Rodymo pradžia</td>
                  <td>Rodymo pabaiga</td>
                </tr>
                </thead>
                <tbody>
                {this.state.movie.pastEvents.length > 0 ?
                  this.state.movie.pastEvents.map(this.renderEventRow) :
                  (
                    <tr>
                      <td colSpan={3}>Šis filmas seniau nebuvo niekur rodomas</td>
                    </tr>
                  )
                }
                </tbody>
              </Table>
            </Col>
          </Row>
          {renderVideos(this.state.movie.videos)}
        </Grid>
      </div>
    );
  }
}

MoviePage.propTypes = {

};

export default MoviePage;