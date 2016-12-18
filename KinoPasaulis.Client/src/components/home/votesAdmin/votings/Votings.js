import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import VotesAdminNavigationBar from '../VotesAdminNavigationBar';
import { Button } from 'react-bootstrap';
import { Well, Col } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';

class Votings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votings: []
    };
  }

  componentDidMount() {

    axios.get('/api/voting/votings')
        .then(response => {
          console.log(response.data);
          this.setState({
            votings: response.data
          })
        })
        .catch(error => {
          console.log(error);
        });
  }

  renderVotings() {
    let votings = this.state.votings;

    return votings.map((voting, index) => {
      return <div key={index}>
        <Col md={4}>
          <Well>
            <h2> {voting.title} </h2>
            <div>Balsavimo laikotarpis:</div>
            {moment(voting.startDate).format('YYYY/MM/DD HH:mm:ss')} - {moment(voting.endDate).format('YYYY/MM/DD HH:mm:ss')}
            <p>Sukurtas: {moment(voting.createdAt).format('YYYY/MM/DD HH:mm:ss')}</p>
            <p>Kandidatai:</p>
            {voting.movieCreatorVotings.map((mcv, index) => (
                <div key={index}>{mcv.movieCreator.firstName} {mcv.movieCreator.lastName}</div>
            ))}
            <a className="btn btn-primary"> Pašalinti </a>
          </Well>
        </Col>
      </div>
    });
  }

  render() {
    return (
      <div>
        <VotesAdminNavigationBar
        />
        <div className="container">
          <Col md={12}>
            <h2> Balsavimai </h2>
            {this.renderVotings()}
          </Col>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.theaterPage.events || [],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goToVotingCreateForm: () => {
      dispatch(push('/votesAdmin/newVoting'));
    },

    getVotings: () => {
      dispatch(getVotings());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Votings);