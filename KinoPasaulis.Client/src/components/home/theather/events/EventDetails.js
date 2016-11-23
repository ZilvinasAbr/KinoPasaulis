import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TheatherNavigationBar from '../TheatherNavigationBar';
import { getEventById } from '../../../../actions/theather/eventActions';
import { logout } from '../../../../actions/account/logoutActions';
import { Well, Col, ButtonToolbar, OverlayTrigger, Button, Popover, Modal } from 'react-bootstrap';
import moment from 'moment';
import { deleteShowById } from '../../../../actions/theather/eventActions'
import './eventsStyles.scss';

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      idToBeDeleted: 0,
      idArrayDeleted: 0
    };
  }

  componentDidMount() {
    this.props.getEvent(this.props.params.id);
  }

  _openModal(index, arrayIndex) {
    this.setState({modalOpen: true});
    this.setState({idToBeDeleted:index});
    this.setState({idArrayDeleted:arrayIndex});
  }

  _closeModal() {
    this.setState({modalOpen: false});
  }

  deleteShow() {
    this.setState({modalOpen: false});
    this.props.deleteShow(this.state.idToBeDeleted, this.state.idArrayDeleted);
  }

  renderEditDeleteButtons(showOver, showId, index) {
    if(showOver == null)
    {
      return (
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this._openModal.bind(this, showId, index)}> <span className="glyphicon glyphicon-remove"></span> </Button>
          <OverlayTrigger trigger="click" rootClose placement="left" overlay={editForm()}>
            <Button> <span className="glyphicon glyphicon-pencil"></span> </Button>
          </OverlayTrigger>
        </ButtonToolbar>
      )
    }
  }

  renderShows() {
    let shows = this.props.shows;
    return shows.map((show, index) => {
      var now = new Date();
      let showOver = null;
      if(moment(show.startTime).format('YYYY/MM/DD HH:MM') < moment(now).format('YYYY/MM/DD HH:mm'))
      {
        showOver = "showOver";
      }
      return <div key={index}>
        <Col md={4}>
          <Well bsSize={"lg"} className={showOver}>
            <p> Auditorijos pavadinimas: {show.auditorium.name} </p>
            <p> Vietų skaičius: {show.auditorium.seats} </p>
            <p> Seanso pradžia: {moment(show.startTime).format('YYYY/MM/DD HH:mm')}</p>
            {this.renderEditDeleteButtons(showOver, show.id, index)}
          </Well>
        </Col>
      </div>
    });
  }

  render() {
    return (
      <div>
        <TheatherNavigationBar
          changePageToLanding={this.props.changePageToLanding}
          goToAuditoriums={this.props.goToAuditoriums}
          goToEvents={this.props.goToEvents}
          goToSubscriptions={this.props.goToSubscriptions}
          logout={this.props.logout}
        />
        <div className="container">
          <h1>{this.props.movie.title}</h1>
          Rodymo laikotarpis:
          {moment(this.props.event.startTime).format('YYYY/MM/DD')} -
          {moment(this.props.event.endTime).format('YYYY/MM/DD')}
          <h1> Seansai </h1>
          {this.renderShows()}
        </div>
        <Modal
          show={this.state.modalOpen}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title">Show is about to be deleted</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Proceed?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.deleteShow.bind(this)} bsStyle="danger">Delete</Button>
            <Button onClick={this._closeModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const editForm = () => (
  <Popover id="popover-positioned-left" title="Redaguoti pasirinktą seansą">
    <div>
      Update dis
    </div>
  </Popover>
);

function mapStateToProps(state) {
  return {
    event: state.theaterPage.event || {},
    movie: state.theaterPage.movie || {},
    shows: state.theaterPage.shows || []
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

    logout: () => {
      dispatch(logout());
    },

    goToEventCreateForm: () => {
      dispatch(push('/theather/newEvent'));
    },

    getEvent: (id) => {
      dispatch(getEventById(id));
    },

    deleteShow: (id, index) => {
      dispatch(deleteShowById(id, index));
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);