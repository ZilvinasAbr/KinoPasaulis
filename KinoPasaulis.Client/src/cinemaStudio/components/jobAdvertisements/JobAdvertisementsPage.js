import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Col, Table } from 'react-bootstrap';

import {
  fetchJobAdvertisements,
  deleteJobAdvertisement
} from '../../actions/jobAdvertisements';
import CinemaStudioNavigationBar from '../CinemaStudioNavigationBar';

class JobAdvertisementsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchJobAdvertisements());
  }

  handleDeleteJobAd(index) {
    let jobAdvertisement = this.props.jobAdvertisements[index];

    this.props.dispatch(deleteJobAdvertisement(jobAdvertisement.id));
  }

  renderJobAdvertisements(jobAdvertisements) {
    if(jobAdvertisements.length <= 0) {
      return (
        <tr>
          <td colSpan={7}>
            Nėra darbo skelbimų
          </td>
        </tr>
      );
    }

    return jobAdvertisements.map((jobAd, index) => (
      <tr key={index}>
        <td>{index+1}</td>
        <td>{jobAd.movieTitle}</td>
        <td>{jobAd.specialtyTitle}</td>
        <td>{jobAd.title}</td>
        <td>{jobAd.duration}</td>
        <td>{jobAd.payRate}</td>
        <td>
          <Button bsStyle="danger" onClick={() => this.handleDeleteJobAd(index)}>
            Pašalinti
          </Button>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <div>
        <CinemaStudioNavigationBar />
        <Col xs={8} xsOffset={2} sm={6} smOffset={3} lg={4} lgOffset={4}>
          <h1>Darbo skelbimai</h1>
          <hr />
        </Col>
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
            {this.renderJobAdvertisements(this.props.jobAdvertisements)}
            </tbody>
          </Table>
        </Col>
        <div>
          <Button
            bsStyle="primary"
            onClick={() => this.props.dispatch(
              push('/cinemaStudio/addJobAdvertisement')
            )}
          >
            Pridėti darbo skelbimą
          </Button>
        </div>
      </div>
    )
  }
}

JobAdvertisementsPage.propTypes = {
  jobAdvertisements: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
}

function mapStateToProps(state) {
  return {
    jobAdvertisements: state.cinemaStudioPage.jobAdvertisements
  }
}

export default connect(mapStateToProps)(JobAdvertisementsPage);