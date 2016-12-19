import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Col, Table, Modal } from 'react-bootstrap';

import {
  fetchJobAdvertisements,
  deleteJobAdvertisement
} from '../../actions/jobAdvertisements';
import CinemaStudioNavigationBar from '../CinemaStudioNavigationBar';

const ModalInstance = ({isOpen, selectedJobAdvertisement, onDelete, onClose}) => {
  if(isOpen) {
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Pašalinti darbo skelbimą</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Ar tikrai norite pašalinti "{selectedJobAdvertisement.title}" darbo skelbimą?
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="danger" onClick={() => onDelete(selectedJobAdvertisement.id)}>Pašalinti</Button>
            <Button bsStyle="primary" onClick={onClose}>Atšaukti</Button>
          </Modal.Footer>

        </Modal.Dialog>
      </div>
    );
  }

  return null;
};

class JobAdvertisementsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      selectedJobAdvertisement: null
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.deleteJobAdvertisement = this.deleteJobAdvertisement.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchJobAdvertisements());
  }

  handleOpenDeleteModal(index) {
    this.setState({
      isModalOpen: true,
      selectedJobAdvertisement: this.props.jobAdvertisements[index]
    });
  }

  handleCloseModal() {
    this.setState({
      isModalOpen: false,
      selectedJobAdvertisement: null
    });
  }

  deleteJobAdvertisement(id) {
    this.setState({
      isModalOpen: false,
      selectedJobAdvertisement: null
    });

    this.props.dispatch(deleteJobAdvertisement(id));
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
        <td>{jobAd.duration} dienų</td>
        <td>{jobAd.payRate}</td>
        <td>
          <Button bsStyle="danger" onClick={() => this.handleOpenDeleteModal(index)}>
            Pašalinti
          </Button>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <div>
        <ModalInstance
          isOpen={this.state.isModalOpen}
          selectedJobAdvertisement={this.state.selectedJobAdvertisement}
          onDelete={this.deleteJobAdvertisement}
          onClose={this.handleCloseModal}
        />
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