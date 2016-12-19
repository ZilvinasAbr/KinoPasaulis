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

    delete(votingId) {
        console.log(votingId);
        var approve = confirm("Paspaudus OK, bus ištrintas balsavimas kartu su visais balsais!");
        console.log(votingId);

        if(approve === true)
        {
            axios.post(`/api/voting/deleteVoting/${votingId}`)
                .then(response => {
                    console.log('success');
                    console.log(response);
                    alert("Balsavimas pašalintas sėkmingai.");
                    this.setState({
                        votings: this.state.votings.filter(voting => voting.id !== votingId)
                    });

                })
                .catch(error => {
                    console.log(error);
                    alert("Balsavimas nebuvo pašalintas.");
                })
        }
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

        if(votings.length <= 0) {
            return (
                <tr>
                    <td colSpan={7}>
                        Nėra sukurtų balsavimų.
                    </td>
                </tr>
            );
        }

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
                        <Button bsStyle="primary" onClick={() => this.delete(voting.id)}> Pašalinti </Button>
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

export default connect()(Votings);