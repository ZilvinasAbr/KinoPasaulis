import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TheatherNavigationBar from '../TheatherNavigationBar';
import AddAuditoriumForm from '../AddAuditoriumForm';
import UpdateAuditoriumForm from '../UpdateAuditoriumForm';
import { Button, Popover, ButtonToolbar, OverlayTrigger, Col, Table, Modal } from 'react-bootstrap';
import { getAuditoriums, deleteAuditorium, requestUpdateAuditorium } from '../../../../actions/theather/auditoriumActions';
import { logout } from '../../../../actions/account/logoutActions';

class Auditoriums extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      idToBeDeleted: 0,
      idArrayDeleted: 0,
      editAuditorium: {}
    };
  }

  _openModal(index, arrayIndex) {
    this.setState({modalOpen: true});
    this.setState({idToBeDeleted:index});
    this.setState({idArrayDeleted:arrayIndex});
  }

  assignAuditorium(arrayIndex) {
    console.log(arrayIndex);
    let auditorium = this.props.auditoriums[arrayIndex];
    this.setState({editAuditorium: auditorium});
    console.log(this.state.editAuditorium);
  }

  _closeModal() {
    this.setState({modalOpen: false});
  }

  deleteAuditorium() {
    this.setState({modalOpen: false});
    this.props.deleteAuditoriumFromList(this.state.idToBeDeleted, this.state.idArrayDeleted);
  }

  componentDidMount() {
    this.props.getAuditoriums();
  }

  renderAuditoriums() {
    let auditoriums = this.props.auditoriums;

    return auditoriums.map((a, index) => {
      return <tr key={index}>
        <td>{a.name} </td>
        <td> {a.seats} </td>
        <td>
          <ButtonToolbar>
            <Button bsStyle="danger" onClick={this._openModal.bind(this, a.id, index)}> <span className="glyphicon glyphicon-remove"></span> </Button>
            <OverlayTrigger trigger="click" rootClose placement="left" overlay={editForm(this.props.auditoriumToBeUpdated)}>
              <Button onClick={this.props.requestUpdateAuditorium.bind(this, a)}> <span className="glyphicon glyphicon-pencil"></span> </Button>
            </OverlayTrigger>
          </ButtonToolbar>
        </td>
      </tr>
    });
  }

  render() {
    let close = () => this.setState({ show: false});

    return (
      <div>
        <TheatherNavigationBar
          changePageToHome={this.props.changePageToHome}
          goToAuditoriums={this.props.goToAuditoriums}
          goToEvents={this.props.goToEvents}
          goToSubscriptions={this.props.goToSubscriptions}
          logout={this.props.logout}
        />
        <Col md={3}>
          <div className="container">
            <h1> Auditoriums </h1>
            <ButtonToolbar>
              <OverlayTrigger trigger="click" rootClose placement="right" overlay={addNewForm}>
                <Button>Nauja</Button>
              </OverlayTrigger>
            </ButtonToolbar>
          </div>
        </Col>
        <Col md={9}>
          <div className="container">
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Seats</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.renderAuditoriums()}
              </tbody>
            </Table>
          </div>
        </Col>
        <Modal
          show={this.state.modalOpen}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title">Auditorium is about to be deleted</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Proceed?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.deleteAuditorium.bind(this)} bsStyle="danger">Delete</Button>
            <Button onClick={this._closeModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const addNewForm = (
  <Popover id="popover-positioned-left" title="Prideti nauja auditorija">
    <AddAuditoriumForm/>
  </Popover>
);

const editForm = (auditorium) => (
  <Popover id="popover-positioned-left" title="Redaguoti pasirinktą auditoriją">
    <UpdateAuditoriumForm auditorium={auditorium} />
  </Popover>
);

function mapStateToProps(state) {
  return {
    auditoriums: state.theaterPage.auditoriums || [],
    auditoriumToBeUpdated: state.theaterPage.auditoriumToBeUpdated || {}
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePageToHome: () => {
      dispatch(push('/home'));
    },

    goToAuditoriums: () => {
      dispatch(push('/theather/auditoriums'));
    },

    goToEvents: () => {
      dispatch(push('/theather/events'));
    },

    goToSubscriptions: () => {
      dispatch(push('/theather/subscriptions'));
    },

    logout: () => {
      dispatch(logout());
    },

    getAuditoriums: () => {
      dispatch(getAuditoriums());
    },

    requestUpdateAuditorium: (auditorium) => {
      dispatch(requestUpdateAuditorium(auditorium));
    },

    deleteAuditoriumFromList: (id, arrayId) => {
      dispatch(deleteAuditorium(id, arrayId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auditoriums);