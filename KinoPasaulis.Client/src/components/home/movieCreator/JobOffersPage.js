import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import MovieCreatorNavigationBar from './MovieCreatorNavigationBar';
import { Grid, Row, Button, Popover, ButtonToolbar, OverlayTrigger, Col, Table, Modal, Checkbox, FormControl, Thumbnail } from 'react-bootstrap';

class JobOffersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobOffers: [],
      specialties: [],
      payRateFilter: '',
      specialtyFilter: '',
      durationFilter: '',
      showModal: false,
      messageText: ''
    };
  }

  componentDidMount() {

    axios.get('/api/moviecreator/getJobs')
        .then(response => {
          //console.log(response.data);
          this.setState({
            jobOffers: response.data
          })
        })
        .catch(error => {
          console.log(error);
        });

    axios.get('/api/cinemaStudio/specialties')
        .then(response => {
          this.setState({
            specialties: response.data || []
          });
        })
        .catch(error => {
          console.log(error);
        });
  }

  handleSpecialtyFilter(e) {
    this.setState({
      specialtyFilter: e.target.value
    });
  }

  handlePayRateFilter(e) {
    this.setState({
      payRateFilter: e.target.value
    });
  }

  handleDurationFilter(e) {
    this.setState({
      durationFilter: e.target.value
    });
  }

  open() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  updateMessageText(evt) {
    this.setState({
      messageText: evt.target.value
    });
  }

  renderJobAdvertisements() {
    let jobOffers = this.state.jobOffers;
    if(jobOffers.length <= 0) {
      return (
          <tr>
            <td colSpan={7}>
              Nėra darbo skelbimų
            </td>
          </tr>
      );
    }

    let filteredJobOffers = jobOffers
        .filter(jobOffer => {
          if(this.state.specialtyFilter === '') {
            return true;
          }
          return jobOffer.specialty.title === this.state.specialtyFilter;
        })
        .filter(jobOffer => {
          if(this.state.payRateFilter === '') {
            return true;
          }
          return jobOffer.payRate >= this.state.payRateFilter;
        })
        .filter(jobOffer => {
          if(this.state.durationFilter === '') {
            return true;
          }
          return jobOffer.duration <= this.state.durationFilter;
        });

    if(filteredJobOffers.length <= 0) {
      return (
          <tr>
            <td colSpan={7}>
              Nėra darbo skelbimų
            </td>
          </tr>
      );
    }

    return filteredJobOffers.map((jobOffer, index) => (
        <tr key={index}>
          <td>{index+1}</td>
          <td>{jobOffer.movie.title}</td>
          <td>{jobOffer.specialty.title}</td>
          <td>{jobOffer.title}</td>
          <td>{jobOffer.duration} dienų</td>
          <td>{jobOffer.payRate}</td>
          <td>
            <Button
                bsStyle="primary"
                bsSize="sm"
                onClick={this.open.bind(this)}
            >
              Parašyti
            </Button>
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title> Parašyti dėl darbo skelbimo </Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <FormControl value={this.state.messageText} onChange={this.updateMessageText.bind(this)} componentClass="textarea" rows="10" placeholder="Pranešimas" bsSize="large" />

              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle="success" onClick={this.sendMessage.bind(this, jobOffer.movie.cinemaStudioId, this.state.messageText)}> Siųsti </Button>
                <Button bsStyle="danger" onClick={this.close.bind(this)}>Uždaryti</Button>
              </Modal.Footer>
            </Modal>
          </td>
        </tr>
    ));
  }

  sendMessage(cinemaStudio, message)
  {
    this.close();

    return axios.post('/api/message/addMessage', {
      CinemaStudioId: cinemaStudio,
      Text: message
    })
        .then(response => {
          if(response.status = 200)
          {
            alert('Pranešimas išsiųstas sėkmingai')
          }
        })
        .catch(error => {
          console.log(error);
        })
  }

  render() {
    return (
        <div>
          <MovieCreatorNavigationBar />
          <Grid>
            <Row>
              <Col xs={8} xsOffset={2} sm={6} smOffset={3} lg={4} lgOffset={4}>
                <h1>Darbo skelbimai</h1>
                <hr />
              </Col>
            </Row>
            <Row>
              <Col xs={10} xsOffset={1} sm={10} smOffset={1} lg={6} lgOffset={3}>
                <p>Minimalus atlygis, €</p>
                <input
                    type="number"
                    value={this.state.payRateFilter}
                    onChange={(e) => this.handlePayRateFilter(e)}
                />
                <p>Maksimali sutarties trukmė, dienos</p>
                <input
                    type="number"
                    value={this.state.durationFilter}
                    onChange={(e) => this.handleDurationFilter(e)}
                />
                <p>Pareiga</p>
                <select
                    value={this.state.specialtyFilter}
                    onChange={(e) => this.handleSpecialtyFilter(e)}
                >
                  <option value="">Visi</option>
                  {this.state.specialties.map((specialty, index) => (
                      <option key={index} value={specialty.title}>{specialty.title}</option>
                  ))}
                </select>
              </Col>
            </Row>
            <Row>
              <Col xs={10} xsOffset={1} sm={10} smOffset={1} lg={6} lgOffset={3}>
                <Table striped bordered condensed hover>
                  <thead>
                  <tr>
                    <th>#</th>
                    <th>Filmo pavadinimas</th>
                    <th>Ieškoma pareiga</th>
                    <th>Antraštė</th>
                    <th>Sutarties trukmė</th>
                    <th>Atlygis</th>
                    <th>Veiksmai</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.renderJobAdvertisements()}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Grid>
        </div>);
  }
}

function mapStateToProps(state) {
  return {
    userData: state.homePage.userData
  }
}

export default connect(mapStateToProps)(JobOffersPage);