import React from 'react';
import { connect } from 'react-redux';
import MovieCreatorNavigationBar from './MovieCreatorNavigationBar';
import { Button } from 'react-bootstrap';
import { Well, Col } from 'react-bootstrap';
import axios from 'axios';

class AwardsStatisticsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winners: []
        };
    }

    componentDidMount() {

        axios.get('/api/moviecreator/getAwardsStatistics')
            .then(response => {
                console.log(response.data);
                this.setState({
                    winners: response.data
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderAwards() {
        let winners = this.state.winners;

        if(winners.length <= 0) {
            return (
                <tr>
                    <td colSpan={7}>
                        Nėra balsavimų nugalėtojų.
                    </td>
                </tr>
            );
        }

        return winners.map((winner, index) => {
            return <div key={index}>
                <Col md={4}>
                    <Well>
                        <h2> {winner.movieCreator.firstName} {winner.movieCreator.lastName} </h2>
                        <div>Laimėjimų skaičius:</div>
                        {winner.wins}
                    </Well>
                </Col>
            </div>
        });
    }

    render() {
        return (
            <div>
                <MovieCreatorNavigationBar
                />
                <div className="container">
                    <Col md={12}>
                        <h2> Daugiausia balsavimų laimėję kino kūrėjai </h2>
                        {this.renderAwards()}
                    </Col>
                </div>
            </div>
        );
    }
}

export default connect()(AwardsStatisticsPage);