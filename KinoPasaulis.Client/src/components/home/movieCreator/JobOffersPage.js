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
      specialtyFilter: ''
    };
  }

  componentDidMount() {

    axios.get('/api/moviecreator/getJobs')
      .then(response => {
        console.log(response.data);
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

    return jobOffers
      .filter((jobOffer) => {
        if(this.state.specialtyFilter === '') {
          return true;
        }

        return jobOffer.specialty.title === this.state.specialtyFilter;
      })
      .map((jobOffer, index) => (
        <tr key={index}>
          <td>{index+1}</td>
          <td>{jobOffer.movie.title}</td>
          <td>{jobOffer.specialty.title}</td>
          <td>{jobOffer.title}</td>
          <td>{jobOffer.duration} dienų</td>
          <td>{jobOffer.payRate}</td>
          <td>
            <Button>
              Parašyti kino studijai
            </Button>
          </td>
        </tr>
      ));
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
              <p>Minimalus atlygis</p>
              <select>
                <option value="1000">1000</option>
                <option value="5000">5000</option>
                <option value="10000">10000</option>
                <option value="50000">50000</option>
                <option value="100000">100000</option>
              </select>
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