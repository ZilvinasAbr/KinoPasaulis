import React from 'react';
import axios from 'axios';
import moment from 'moment';

import CinemaStudioNavigationBar from '../CinemaStudioNavigationBar';
import { Grid, Row, Col, Table } from 'react-bootstrap';

class MessagesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    axios.get('/api/message/readMessages')
      .then(response => {
        this.setState({
          messages: response.data
        })
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <CinemaStudioNavigationBar />
        <Grid>
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={4} mdOffset={4} lg={4} lgOffset={4}>
              <h1>Gauti pranešimai</h1>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
              <Table striped bordered condensed hover>
                <thead>
                <tr>
                  <th>Siuntėjas</th>
                  <th>El. paštas</th>
                  <th>Telefono numeris</th>
                  <th>Išsiuntimo laikas</th>
                  <th>Tekstas</th>
                </tr>
                </thead>
                <tbody>
                {this.state.messages.length > 0 ?
                  this.state.messages.map((message, index) => (
                    <tr key={index}>
                      <td>{`${message.movieCreator.firstName} ${message.movieCreator.lastName}`}</td>
                      <td>{message.movieCreator.email}</td>
                      <td>{message.movieCreator.phone}</td>
                      <td>{moment(message.sentAt).format('YYYY-MM-D HH:mm')}</td>
                      <td>{message.text}</td>
                    </tr>
                  )) :
                  <tr colSpan={3}>
                    <td>Nėra gautų pranešimų</td>
                  </tr>
                }
                </tbody>
              </Table>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default MessagesPage;