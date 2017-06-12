import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import axios from 'axios';
import { Button, Popover, ButtonToolbar, OverlayTrigger, Col, Table, Modal, Checkbox, FormControl, Row  } from 'react-bootstrap';
import moment from 'moment';

import ClientNavigationBar from './client/ClientNavigationBar';

class AnnouncementsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: []
    }

  }

  componentDidMount() {
    axios.get('/api/Client/readAnnouncements')
      .then(response => {
        this.setState({
          announcements: response.data
        })
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderAnnouncements() {
    let announcements = this.state.announcements;

    return announcements.map((ann, index) => {
      return <div>
        <hr/>
        <Row>
          <Col md="3">
            <h3> {ann.theater.title} </h3>
            <br/>
            Išsiųstas: {moment(ann.sent).format('YYYY/MM/DD HH:MM')}
            <br/>
            Peržiūrėtas: {moment(ann.seen).format('YYYY/MM/DD HH:MM')}
          </Col>
          <Col md="9">
            <h3> Pranešimas </h3>
            <p> {ann.message} </p>
          </Col>
        </Row>
        <hr/>
      </div>
    });
  }

  render() {
    return (
      <div>
        <ClientNavigationBar
          changePageToHome=""
          changePageToProfile=""
          logout=""
          goToAnnouncements=""/>

        <div className="container">
          <h1> Pranešimai </h1>
          {this.renderAnnouncements()}
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    event: state.theaterPage.event || {},
    movie: state.theaterPage.movie || {},
    shows: state.theaterPage.shows || []
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsPage);