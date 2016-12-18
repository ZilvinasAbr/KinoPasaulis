import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { logout } from '../../../actions/account/logoutActions';
import TheatherNavigationBar from './TheatherNavigationBar';
import { receiveSubscribers, sendAnnouncement } from '../../../actions/theather/subscriberActions';
import { Button, Popover, ButtonToolbar, OverlayTrigger, Col, Table, Modal, Checkbox, FormControl  } from 'react-bootstrap';

class Subscriptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      markedSubscribers: [],
      inputValue: '',
      disabledSend:true,
      disabledCheckboxes:false
    };
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  open() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  addOrRemoveFromSubscribersList(id)
  {
    var idx = this.state.markedSubscribers.indexOf(id);
    if(idx == -1)
    {
      this.state.markedSubscribers.push(id);
    }
    else
    {
      this.state.markedSubscribers.splice(idx, 1);
    }

    if(this.state.markedSubscribers.length == 0)
    {
      this.setState({disabledSend: true});
    }
    else
    {
      this.setState({disabledSend: false});
    }
  }

  sendToEveryone()
  {
    if(this.state.disabledCheckboxes == false)
    {
      this.setState({disabledCheckboxes: true});
      this.setState({disabledSend: false});
    }
    else
    {
      this.setState({disabledCheckboxes: false});
      if(this.state.markedSubscribers.length == 0)
      {
        this.setState({disabledSend: true});
      }
    }
  }


  render() {
    return (
      <div>
        <TheatherNavigationBar
          changePageToHome={this.props.changePageToHome}
          goToAuditoriums={this.props.goToAuditoriums}
          goToEvents={this.props.goToEvents}
          goToSubscriptions={this.props.goToSubscriptions}
          logout={this.props.logout}
        />
        <Col md={9}>
          <div className="container">
            <h1> Prenumeratoriai </h1>
            <Table responsive hover>
              <thead>
              <tr>
                <th> Vardas </th>
                <th> Pavardė </th>
                <th> El. paštas </th>
                <th> Telefonas </th>
                <th> Siųsti </th>
              </tr>
              </thead>
              <tbody>
              {this.renderSubscribers()}
              <tr>
                <th> </th>
                <th> </th>
                <th> </th>
                <th> </th>
                <th> Siųsti visiem </th>
              </tr>
              <tr>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> <Checkbox onChange={this.sendToEveryone.bind(this)} /> </td>
              </tr>
              </tbody>
            </Table>
          </div>

          <Button
            bsStyle="primary"
            bsSize="large"
            disabled={this.state.disabledSend}
            onClick={this.open.bind(this)}
          >
            Pranešti
          </Button>
          <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title> Rašykite savo pranešimą! </Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <FormControl value={this.state.inputValue} onChange={this.updateInputValue.bind(this)} componentClass="textarea" placeholder="Pranešimas" bsSize="large" />

            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="success" onClick={this.sendAnnouncement.bind(this, this.state.markedSubscribers, this.state.inputValue)}> Siųsti </Button>
              <Button bsStyle="danger" onClick={this.close.bind(this)}>Uždaryti</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </div>
    );
  }

  sendAnnouncement(subscribers, message)
  {
    this.close();
    if(this.state.disabledCheckboxes == true)
    {
      let subscriberIds = [];
      let allSubscribers = this.props.subscribers;

      allSubscribers.map((subscriber) => {
        subscriberIds.push(subscriber.id)
      });

      sendAnnouncement(subscriberIds, message);
    }
    else
    {
      sendAnnouncement(subscribers, message);
    }
  }


  renderSubscribers() {
    let subscribers = this.props.subscribers;

    return subscribers.map((subscriber, index) => {
      return <tr key={index}>
        <td>{subscriber.firstName} </td>
        <td> {subscriber.lastName} </td>
        <td> {subscriber.email} </td>
        <td> {subscriber.phone} </td>
        <td><Checkbox name="check" disabled={this.state.disabledCheckboxes} onChange={this.addOrRemoveFromSubscribersList.bind(this, subscriber.id)}/></td>
      </tr>
    });
  }

  componentDidMount() {
    this.props.getSubscribers();
  }
}

function mapStateToProps(state) {
  return {
      subscribers: state.theaterPage.subscribers || [],
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

    getSubscribers: () => {
       dispatch(receiveSubscribers());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);