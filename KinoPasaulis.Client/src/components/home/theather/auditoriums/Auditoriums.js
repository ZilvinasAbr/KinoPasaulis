import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TheatherNavigationBar from '../TheatherNavigationBar';
import AddAuditoriumForm from '../AddAuditoriumForm';
import { Button, Popover, ButtonToolbar, OverlayTrigger, Col, Table, Modal } from 'react-bootstrap';
import { getAuditoriums, deleteAuditorium } from '../../../../actions/theather/auditoriumActions';

class Auditoriums extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      idToBeDeleted: 0,
      editAuditorium: {}
    };
  }

  _openModal(index) {
    this.setState({modalOpen: true});
    this.setState({idToBeDeleted:index});
  }

  assignAuditorium(auditoriumIndex) {
    console.log(auditoriumIndex);

    let auditorium = this.props.auditoriums[auditoriumIndex];
   // this.setState({editAuditorium: auditorium});
  }

  _closeModal() {
    this.setState({modalOpen: false});
  }

  deleteAuditorium() {
    this.setState({modalOpen: false});
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
            <Button bsStyle="danger" onClick={this._openModal.bind(this, a.id)}> <span className="glyphicon glyphicon-remove"></span> </Button>
            <OverlayTrigger trigger="click" rootClose placement="left" overlay={editForm}>
              <Button onClick={this.assignAuditorium(index)}> <span className="glyphicon glyphicon-pencil"></span> </Button>
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
          changePageToLanding={this.props.changePageToLanding}
          goToAuditoriums={this.props.goToAuditoriums}
          goToEvents={this.props.goToEvents}
          goToSubscriptions={this.props.goToSubscriptions}
          logOut={this.props.logOut}
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

const editForm = (
  <Popover id="popover-positioned-left" title="Redaguoti pasirinktą auditoriją">
    <AddAuditoriumForm/>
  </Popover>
);

function mapStateToProps(state) {
  return {
    auditoriums: state.theaterPage.auditoriums || []
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePageToLanding: () => {
      dispatch(push('/'));
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

    logOut: () => {
      dispatch(push('/theather/logout'));
    },

    getAuditoriums: () => {
      dispatch(getAuditoriums());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auditoriums);