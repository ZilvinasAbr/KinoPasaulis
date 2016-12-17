import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { logout } from '../../../actions/account/logoutActions';
import TheatherNavigationBar from './TheatherNavigationBar';
import { receiveSubscribers } from '../../../actions/theather/subscriberActions';
import { Button, Popover, ButtonToolbar, OverlayTrigger, Col, Table, Modal } from 'react-bootstrap';

class Subscriptions extends React.Component {
  constructor(props) {
    super(props);
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
        <h1> Subscribers </h1>
        <Col md={9}>
          <div className="container">
            <Table responsive hover>
              <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
              </thead>
              <tbody>
              {this.renderSubscribers()}
              </tbody>
            </Table>
          </div>
        </Col>
      </div>
    );
  }

  renderSubscribers() {
    let subscribers = this.props.subscribers;
    console.log(subscribers);
    return subscribers.map((subscriber, index) => {
      return <tr key={index}>
        <td>{subscriber.firstName} </td>
        <td> {subscriber.lastName} </td>
        <td> {subscriber.email} </td>
        <td> {subscriber.phone} </td>
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